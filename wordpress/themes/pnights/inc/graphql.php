<?php

add_action( 'graphql_theme_fields', function( $fields ) {
  $fields['fullName'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The full name of the site owner.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'full_name' );
      return $mod ? $mod : NULL;
    },
  ];
  $fields['heroImage'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The URL of the hero image.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'hero_image' );
      return $mod ? $mod : NULL;
    },
  ];
  $fields['heroImageTint'] = [
    'type' => \WPGraphQL\Types::int(),
    'description' => __( 'The percentage of black to overlay the image.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'hero_image_tint' );
      return $mod ? $mod : NULL;
    },
  ];
  $fields['primaryHex'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The primary hex color.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'primary_hex' );
      return $mod ? $mod : NULL;
    },
  ];

  return $fields;
} );
