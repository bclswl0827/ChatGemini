#!/bin/sh

if [ -z "${REACT_APP_GEMINI_API_KEY}" ]; then
    echo "env REACT_APP_GEMINI_API_KEY is unset or set to the empty string"
    exit 1
fi

cat << EOF > .env
REACT_APP_TITLE_SITE="${REACT_APP_TITLE_SITE}"
REACT_APP_TITLE_HEADER="${REACT_APP_TITLE_HEADER}"
REACT_APP_GEMINI_API_SSE="${REACT_APP_GEMINI_API_SSE}"
REACT_APP_GEMINI_API_KEY="${REACT_APP_GEMINI_API_KEY}"
REACT_APP_GEMINI_API_URL="${REACT_APP_GEMINI_API_URL}"
REACT_APP_PASSCODE_MD5="${REACT_APP_PASSCODE_MD5}"
EOF

npm run build

cat << EOF > /etc/nginx/http.d/default.conf
server {
    listen 8080 default_server;
    listen [::]:8080 default_server;

    location / {
        root   /app/build;
        index  index.html index.htm;
    }
}
EOF

echo "Nginx is starting..."
nginx -g 'daemon off;'
