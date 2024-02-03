#!/bin/sh

if [ -z "${REACT_APP_GEMINI_API_KEY}" ]; then
    echo "env REACT_APP_GEMINI_API_KEY is unset or set to the empty string!"
    exit 1
fi

# Create Nginx config
if [ "x${REACT_APP_GEMINI_API_URL}" = "x__use_nginx__" ]; then
    REACT_APP_GEMINI_API_URL="/api"
fi

tee /usr/share/nginx/html/env.json << EOF
{
    "REACT_APP_PASSCODE_MD5": "${REACT_APP_PASSCODE_MD5}",
    "REACT_APP_TITLE_SITE": "${REACT_APP_TITLE_SITE}",
    "REACT_APP_TITLE_HEADER": "${REACT_APP_TITLE_HEADER}",
    "REACT_APP_GEMINI_API_SSE": "${REACT_APP_GEMINI_API_SSE}",
    "REACT_APP_GEMINI_API_KEY": "${REACT_APP_GEMINI_API_KEY}",
    "REACT_APP_GEMINI_API_URL": "${REACT_APP_GEMINI_API_URL}"
}
EOF

echo "Nginx started."
nginx -g 'daemon off;'
