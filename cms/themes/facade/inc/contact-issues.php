<?php

use PostTypes\PostType;

add_action( 'after_setup_theme', function () {
	// register the custom post type
	$issue = new PostType( 'contact_issue', [
		'graphql_single_name' => 'contactIssue',
		'graphql_plural_name' => 'contactIssues',
		'public' => false,
		'show_in_graphql' => true,
		'show_ui' => true,
		'supports' => ['title']
	] );
	$issue->icon('dashicons-testimonial');
} );
