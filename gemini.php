<?php

define("ACCESS_TOKEN", "Nt6PRcQ2BZ8FY9y7Lnk35S");
define("TARGET_HOST", "generativelanguage.googleapis.com");

class GeminiAPI {
    private $accessToken;
    private $targetHost;
    private $fullTargetURL;
    private $requestMethod;
    private $curlObject;

    public function __construct(string $accessToken, string $targetHost) {
        $this->accessToken = $accessToken;
        $this->targetHost = $targetHost;
    }

    public function __destruct() {
        if ($this->curlObject) {
            curl_close($this->curlObject);
        }
    }

    public function hasAccessPermission(): bool {
        $token = $this->getUrlParam("token", true);
        return $this->accessToken === $token;
    }

    public function initTargetRequest() {
        $this->requestMethod = $this->getReqestMethod();
        $requestPath = $this->getUrlParam("path", true);
        $requestPath = substr($requestPath, 0, 1) === "/" ? $requestPath : "/" . $requestPath;
        $this->fullTargetURL = "https://" . $this->targetHost . $requestPath;

        $this->curlObject = curl_init($this->fullTargetURL);
        curl_setopt($this->curlObject, CURLOPT_HEADER, true);
        curl_setopt($this->curlObject, CURLOPT_CUSTOMREQUEST, $this->requestMethod);

        $headers = $this->getForwardHeaders(["Accept-Encoding: *"], ["accept-encoding"]);
        curl_setopt($this->curlObject, CURLOPT_HTTPHEADER, $headers);

        if ($this->requestMethod === "POST" || $this->requestMethod === "PUT" || $this->requestMethod === "PATCH") {
            curl_setopt($this->curlObject, CURLOPT_POSTFIELDS, file_get_contents("php://input"));
        }
    }

    public function forwardTargetResponse() {
        $sseEnabled = $this->getUrlParam("alt", false, $this->fullTargetURL) === "sse";
        if ($sseEnabled && $this->requestMethod === "POST") {
            curl_setopt($this->curlObject, CURLOPT_RETURNTRANSFER, false);
            curl_setopt($this->curlObject, CURLOPT_TCP_KEEPALIVE, 5);
            curl_setopt($this->curlObject, CURLOPT_TCP_KEEPIDLE, 5);
            curl_setopt($this->curlObject, CURLOPT_TCP_KEEPINTVL, 5);
            $this->setRuntimeBuffer();

            $isHeaderEnd = false;
            curl_setopt($this->curlObject, CURLOPT_WRITEFUNCTION, function ($ch, $data) use (&$isHeaderEnd) {
                if ($data === "\r\n" && !$isHeaderEnd) {
                    $isHeaderEnd = true;
                    return strlen($data);
                }

                if (!$isHeaderEnd && strpos($data, "Transfer-Encoding: chunked") === false) {
                    header($data);
                } else if ($isHeaderEnd) {
                    echo $data;
                }
                return strlen($data);
            });

            curl_exec($this->curlObject);
        } else {
            curl_setopt($this->curlObject, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($this->curlObject);

            list($header, $body) = explode("\r\n\r\n", $response, 2);
            foreach (explode("\r\n", $header) as $hdr) {
                if (strpos($hdr, "Transfer-Encoding: chunked") === false) {
                    header($hdr);
                }
            }

            echo $body;
        }
    }

    private function setRuntimeBuffer() {
        ob_end_clean();
        set_time_limit(0);
        ob_implicit_flush(1);
    }

    private function getReqestMethod(): string {
        return $_SERVER["REQUEST_METHOD"];
    }

    private function getForwardHeaders(array $headers = [], array $blacklist = []): array {
        if (!function_exists('getallheaders')) {
            function getallheaders() {
                $headers = [];
                foreach ($_SERVER as $name => $value) {
                    if (substr($name, 0, 5) === 'HTTP_') {
                        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                    }
                }
                return $headers;
            }
        }

        foreach (getallheaders() as $name => $value) {
            $_name = strtolower($name);
            if ($_name !== "host") {
                if (!in_array($_name, $blacklist)) {
                    $headers[] = "$name: $value";
                }
            }
        }

        return $headers;
    }

    private function getUrlParam(string $key, bool $current, string $url = ""): string {
        if ($current) {
            return $_GET[$key] ?? "";
        }

        $parsedUrl = parse_url($url);
        if (array_key_exists("query", $parsedUrl)) {
            parse_str($parsedUrl["query"], $params);
            return $params[$key] ?? "";
        } else {
            return "";
        }
    }
}

function main() {
    $geminiAPI = new GeminiAPI(ACCESS_TOKEN, TARGET_HOST);
    if (!$geminiAPI->hasAccessPermission()) {
        header("HTTP/1.1 403 Forbidden");
        exit;
    }

    $geminiAPI->initTargetRequest();
    $geminiAPI->forwardTargetResponse();
}

main();
