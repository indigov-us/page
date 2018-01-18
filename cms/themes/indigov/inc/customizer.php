<?php

add_action( 'customize_register', function( $wp_customize ) {
  // hero section
  $wp_customize->add_section( 'hero', [
    'title' => 'Hero',
    'description' => 'The hero section',
    'priority' => 1
  ] );

  // hero image
  $wp_customize->add_setting( 'hero_image' );
  $wp_customize->add_control( new WP_Customize_Image_Control(
    $wp_customize,
    'hero_image', [
      'label' => 'Image',
      'section' => 'hero'
    ]
  ) );

  // hero image tint %
  $wp_customize->add_setting( 'hero_image_tint' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'hero_image_tint', [
      'choices' => [
        '0' => 0,
        '10' => 10,
        '20' => 20,
        '30' => 30,
        '40' => 40,
        '50' => 50,
        '60' => 60,
        '70' => 70,
        '80' => 80,
        '90' => 90
      ],
      'label' => 'Image Tint %',
      'section' => 'hero',
      'type' => 'select'
    ]
  ) );

  // email_modal_gate
  $wp_customize->add_setting( 'email_modal_gate' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'email_modal_gate', [
      'label' => 'Show email modal gate?',
      'type' => 'checkbox',
      'section' => 'title_tagline'
    ]
  ) );

  // full_name
  $wp_customize->add_setting( 'full_name' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'full_name', [
      'label' => 'Full Name',
      'section' => 'title_tagline'
    ]
  ) );

  // twitter
  $wp_customize->add_setting( 'twitter_username' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'twitter_username', [
      'label' => 'Twitter Username',
      'section' => 'title_tagline'
    ]
  ) );

  // primary color
  $wp_customize->add_setting( 'primary_hex' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'primary_hex', [
      'label' => 'Primary Color (hex)',
      'section' => 'title_tagline'
    ]
  ) );

  // google analytics view id
  $wp_customize->add_setting( 'ga_view_id' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'ga_view_id', [
      'label' => 'Google Analytics View ID',
      'section' => 'title_tagline'
    ]
  ) );
} );
