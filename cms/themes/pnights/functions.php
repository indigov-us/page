<?php

require_once( 'inc/customizer.php' );
require_once( 'inc/graphql.php' );
require_once( 'inc/settings.php' );

add_theme_support( 'post-thumbnails' );

// set default permalink structure for all sites
add_action( 'init', function () {
  global $wp_rewrite;
  $wp_rewrite->set_permalink_structure( '/%category%/%post_id%-%postname%' );
} );
