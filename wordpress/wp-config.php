<?php

require_once 'vendor/autoload.php';

define( 'DB_NAME',       $_ENV['DB_NAME'] );
define( 'DB_USER',       $_ENV['DB_USER'] );
define( 'DB_PASSWORD',   $_ENV['DB_PASSWORD'] );
define( 'DB_HOST',       $_ENV['DB_HOST'] );

define( 'DB_CHARSET',   'utf8mb4' );
define( 'DB_COLLATE',   '' );

define( 'S3_UPLOADS_BUCKET',              $_ENV['S3_UPLOADS_BUCKET'] );
define( 'S3_UPLOADS_KEY',                 $_ENV['S3_UPLOADS_KEY'] );
define( 'S3_UPLOADS_SECRET',              $_ENV['S3_UPLOADS_SECRET'] );
define( 'S3_UPLOADS_REGION',              $_ENV['S3_UPLOADS_REGION'] );
define( 'S3_UPLOADS_USE_LOCAL',           isset( $_ENV['S3_UPLOADS_USE_LOCAL'] ) && $_ENV['S3_UPLOADS_USE_LOCAL'] == 'true' );
define( 'S3_UPLOADS_HTTP_CACHE_CONTROL',  60 * 60 * 24 * 30 );
define( 'S3_UPLOADS_BUCKET_URL',          $_ENV['S3_UPLOADS_BUCKET_URL'] );

define( 'AUTH_KEY',         $_ENV['AUTH_KEY'] );
define( 'SECURE_AUTH_KEY',  $_ENV['SECURE_AUTH_KEY'] );
define( 'LOGGED_IN_KEY',    $_ENV['LOGGED_IN_KEY'] );
define( 'NONCE_KEY',        $_ENV['NONCE_KEY'] );
define( 'AUTH_SALT',        $_ENV['AUTH_SALT'] );
define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
define( 'LOGGED_IN_SALT',   $_ENV['LOGGED_IN_SALT'] );
define( 'NONCE_SALT',       $_ENV['NONCE_SALT'] );

define( 'DBI_AWS_ACCESS_KEY_ID',      $_ENV['DBI_AWS_ACCESS_KEY_ID'] );
define( 'DBI_AWS_SECRET_ACCESS_KEY',  $_ENV['DBI_AWS_SECRET_ACCESS_KEY'] );

$table_prefix  = 'wp_';

if ( $_ENV['WP_DEBUG'] == 'true' ) {
  define( 'WP_DEBUG', true );
  define( 'WP_DEBUG_DISPLAY', true );
  define( 'SAVEQUERIES', true );
} else {
  define( 'WP_DEBUG', false );
  define( 'WP_DEBUG_DISPLAY', false );
  define( 'SAVEQUERIES', false );
  ini_set( 'display_errors', 'Off' );
  ini_set( 'error_reporting', E_ALL );
}

define( 'WP_ALLOW_MULTISITE',   true );
define( 'MULTISITE',            true );
define( 'SUBDOMAIN_INSTALL',    true );

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define( 'ABSPATH', dirname(__FILE__) . '/' );

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
