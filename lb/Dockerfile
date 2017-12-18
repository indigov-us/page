FROM amd64/nginx

RUN mkdir -p -m 777 /etc/nginx/html && \
  mkdir -p -m 777 /var/log/nginx/healthd

COPY nginx.conf /etc/nginx/nginx.conf
