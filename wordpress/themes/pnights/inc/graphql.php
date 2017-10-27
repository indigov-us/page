<?php

// add custom fields to theme responses
add_action( 'graphql_theme_fields', function( $fields ) {
  $fields['fullName'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The full name of the site owner.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'full_name' );
      return $mod ? $mod : NULL;
    },
  ];
  $fields['gaViewId'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The view ID to use for Google Analytics.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'ga_view_id' );
      return $mod ? $mod : NULL;
    },
  ];
  $fields['heroHeadline'] = [
    'type' => \WPGraphQL\Types::string(),
    'description' => __( 'The main text in the hero.' ),
    'resolve' => function( ) {
      $mod = get_theme_mod( 'hero_headline' );
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

// set default status code to 200 instead of 403
add_action( 'graphql_response_status_code', function( $code ) {
  if ( $code == 403 ) return 200;
  return $code;
} );
