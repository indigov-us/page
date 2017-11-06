<?php

require_once( 'inc/customizer.php' );
require_once( 'inc/graphql.php' );
require_once( 'inc/settings.php' );

add_theme_support( 'post-thumbnails' );

add_action( 'init', function () {
  global $wp_rewrite;
  $wp_rewrite->page_structure = $wp_rewrite->root . 'pages/%pagename%';
} );
