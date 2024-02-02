#!/bin/sh

if [ -z "${REACT_APP_GEMINI_API_KEY}" ]; then
    echo "env REACT_APP_GEMINI_API_KEY is unset or set to the empty string!"
    exit 1
fi

# Create Nginx config
if [ "x${REACT_APP_GEMINI_API_URL}" = "x__use_nginx__" ]; then
    REACT_APP_GEMINI_API_URL="/api"
    cat << EOF > /etc/nginx/http.d/default.conf
server {
    listen 8080 default_server;
    listen [::]:8080 default_server;

    location / {
        root   /app/build;
        index  index.html index.htm;
    }

    location /api {
        proxy_http_version 1.1;
        proxy_read_timeout 86400s;
        proxy_cache off;
        proxy_buffering off;
        proxy_pass https://generativelanguage.googleapis.com/;
    }
}
EOF
else
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
fi

# Set up env variables
cat << EOF > .env
REACT_APP_TITLE_SITE="${REACT_APP_TITLE_SITE}"
REACT_APP_TITLE_HEADER="${REACT_APP_TITLE_HEADER}"
REACT_APP_GEMINI_API_SSE="${REACT_APP_GEMINI_API_SSE}"
REACT_APP_GEMINI_API_KEY="${REACT_APP_GEMINI_API_KEY}"
REACT_APP_GEMINI_API_URL="${REACT_APP_GEMINI_API_URL}"
REACT_APP_PASSCODE_MD5="${REACT_APP_PASSCODE_MD5}"
EOF

# Build and start Nginx
npm run build
echo "Nginx started."
nginx -g 'daemon off;'
