<?php

/**
  * Plugin Name: Questions
  * Description: Adds question and answer posts.
  * Author: Ethan Jon
  * Author URI: http://e10jc.com
*/

use PostTypes\PostType;

add_action( 'after_setup_theme', function () {
	// register the custom post type
	new PostType( 'question', [
		'cptp_permalink_structure' => '/%post_id%-%postname%',
		'graphql_single_name' => 'question',
		'graphql_plural_name' => 'questions',
		'public' => true,
		'rewrite' => [
			'slug' => 'questions',
			'with_front' => false
		],
		'show_in_graphql' => true,
		'show_ui' => true,
		'supports' => ['editor', 'title', 'revisions']
	] );
} );

register_activation_hook( __FILE__, function () {
	flush_rewrite_rules();
} );
