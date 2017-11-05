FROM wordpress:php7.1-apache

RUN apt-get update && \
  apt-get install git zip unzip wget vim -y

WORKDIR /usr/src/composer

# find the latest hashes here: https://github.com/composer/getcomposer.org/commits/master
RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/b107d959a5924af895807021fcef4ffec5a76aa9/web/installer -O - -q | php -- --quiet && \
  mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

# delete default wordpress content
RUN rm -rf /usr/src/wordpress/wp-content/plugins/* && \
  rm -rf /usr/src/wordpress/wp-content/themes/*

COPY wp-config.php                  /usr/src/wordpress
COPY plugins                        /usr/src/wordpress/wp-content/plugins
COPY themes                         /usr/src/wordpress/wp-content/themes
COPY uploads                        /usr/src/wordpress/wp-content/uploads
COPY php.ini                        /usr/local/etc/php/conf.d/
COPY composer.json                  /usr/src/wordpress
COPY composer.lock                  /usr/src/wordpress

RUN cd /usr/src/wordpress && \
  composer self-update && \
  composer install --prefer-dist

RUN chown -R www-data:www-data /usr/src/wordpress

EXPOSE 80
