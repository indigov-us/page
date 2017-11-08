<?php

use PostTypes\PostType;

add_action( 'after_setup_theme', function () {
	// register the custom post type
	new PostType( 'quick_link', [
		'graphql_single_name' => 'quickLink',
		'graphql_plural_name' => 'quickLinks',
		'public' => false,
		'show_in_graphql' => true,
		'show_ui' => true,
		'supports' => ['title']
	] );

	// define the editor page fields
	if ( function_exists( 'register_field_group' ) ) {
		register_field_group( [
			'id' => 'acf_quick-links',
			'title' => 'Quick Links',
			'fields' => [[
				'key' => 'field_icon',
				'label' => 'Icon',
				'name' => 'icon',
				'type' => 'select',
				'choices' => [
					// when adding icons, update the logic in hero-quick-link.js
					'email' => 'Email',
			    'passport' => 'Passport',
					'question' => 'Question',
					'calendar' => 'Calendar',
					'wrench' => 'Wrench',
					'people' => 'People',
					'ribbon' => 'Ribbon',
					'person' => 'Person'
				],
				'default_value' => '',
				'allow_null' => 0,
				'multiple' => 0
			], [
				'key' => 'field_link',
				'label' => 'Link',
				'name' => 'link',
				'type' => 'page_link',
				'post_type' => [
					0 => 'page',
					1 => 'post'
				],
				'allow_null' => 0,
				'multiple' => 0
			]],
			'location' => [[[
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'quick_link',
				'order_no' => 0,
				'group_no' => 0,
			]]],
			'options' => [
				'position' => 'normal',
				'layout' => 'default',
				'hide_on_screen' => [],
			],
			'menu_order' => 0
		] );
	}

	// add the custom fields to graphql response
	add_action( 'graphql_quickLink_fields', function( $fields ) {
	  $fields['icon'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The icon key.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_icon', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];
		$fields['link'] = [
	    'type' => \WPGraphQL\Types::string(),
	    'description' => __( 'The destination URL.' ),
	    'resolve' => function( $post ) {
	      $val = get_field( 'field_link', $post->ID );
	      return $val ? $val : NULL;
	    },
	  ];

	  return $fields;
	} );
} );
