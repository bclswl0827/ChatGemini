FROM node:lts-alpine

WORKDIR /app

COPY ./.* ./
COPY ./*.js* ./
COPY ./src ./src
COPY ./public ./public
COPY entrypoint.sh /entrypoint.sh

RUN apk add --no-cache nginx \
    && chmod +x /entrypoint.sh \
    && npm install

EXPOSE 8080
ENTRYPOINT [ "sh", "-c", "/entrypoint.sh" ]
