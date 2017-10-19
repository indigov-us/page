<?php

add_action('customize_register', function( $wp_customize ) {
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

  // full_name
  $wp_customize->add_setting( 'full_name' );
  $wp_customize->add_control( new WP_Customize_Control(
    $wp_customize,
    'full_name', [
      'label' => 'Full Name',
      'section' => 'title_tagline'
    ]
  ) );
} );
