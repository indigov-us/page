<?php

use PostTypes\PostType;

add_action( 'after_setup_theme', function () {
	// register the custom post type
	$topic = new PostType( 'newsletter_topic', [
		'graphql_single_name' => 'newsletterTopic',
		'graphql_plural_name' => 'newsletterTopics',
		'public' => false,
		'show_in_graphql' => true,
		'show_ui' => true,
		'supports' => ['title']
	] );
	$topic->icon('dashicons-tagcloud');
} );
