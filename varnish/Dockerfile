FROM alpine:latest

RUN apk update && \
  apk upgrade && \
  apk add --no-cache varnish bash

WORKDIR /etc/varnish

COPY default.vcl ./

CMD varnishd -f /etc/varnish/default.vcl && \
  sleep 5 && \
  varnishncsa -w /var/log/varnish/access.log

EXPOSE 80
