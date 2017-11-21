<?php

/**
  * Plugin Name: Offices
  * Description: Adds ability to display office locations.
  * Author: Ethan Jon
  * Author URI: http://e10jc.com
*/

use PostTypes\PostType;

add_action( 'after_setup_theme', function () {
	// register the custom post type
	$office = new PostType( 'office', [
		'graphql_single_name' => 'office',
		'graphql_plural_name' => 'offices',
		'public' => false,
		'show_in_graphql' => true,
		'show_ui' => true,
		'supports' => ['title']
	] );
	$office->icon('dashicons-building');

	// define the editor page fields
	if ( function_exists( 'register_field_group' ) ) {
		register_field_group( [
			'id' => 'acf_offices',
			'title' => 'Offices',
			'fields' => [[
				'key' => 'field_office_street_1',
				'label' => 'Street Address 1',
				'name' => 'street_1',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			], [
				'key' => 'field_office_street_2',
				'label' => 'Street Address 2',
				'name' => 'street_2',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			], [
				'key' => 'field_office_city',
				'label' => 'City',
				'name' => 'city',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			], [
				'key' => 'field_office_state',
				'label' => 'State',
				'name' => 'state',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			], [
				'key' => 'field_office_zip',
				'label' => 'Zip',
				'name' => 'zip',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			], [
				'key' => 'field_office_phone',
				'label' => 'Phone',
				'name' => 'phone',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			]],
			'location' => [[[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'office',
				'order_no' => 0,
				'group_no' => 0,
			]]],
			'options' => [
				'position' => 'normal',
				'layout' => 'default',
				'hide_on_screen' => [],
			],
			'menu_order' => 0,
		]);
	}

	// add the custom fields to graphql response
	add_action( 'graphql_office_fields', function( $fields ) {
	  $fields['street1'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'Line 1 of the street address.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_street_1', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['street2'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'Line 2 of the street address.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_street_2', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['city'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The city.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_city', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['state'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The state.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_state', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['zip'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The zip code.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_zip', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['phone'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The phone number.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_office_phone', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];

	  return $fields;
	} );
} );
