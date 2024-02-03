FROM node:lts-alpine as builder

WORKDIR /app

COPY ./.* ./
COPY ./*.js* ./
COPY ./src ./src
COPY ./public ./public

RUN npm install && npm run build

FROM nginx:stable-alpine

COPY entrypoint.sh /entrypoint.sh
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/* \
    && chmod +x /entrypoint.sh

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080
VOLUME [ "/etc/nginx" ]
VOLUME [ "/usr/share/nginx/html" ]
ENTRYPOINT [ "sh", "-c", "/entrypoint.sh" ]
