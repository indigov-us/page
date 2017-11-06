<?php

// add settings
add_action( 'admin_init', function () {
  register_setting( 'ig', 'zendesk_access_token' );
  register_setting( 'ig', 'zendesk_email_address' );
  register_setting( 'ig', 'zendesk_subdomain' );

  add_settings_section( 'ig_general', null, null, 'ig' );

  add_settings_field(
    'zendesk_access_token',
    '<label for="zendesk_access_token">' . __( 'Zendesk Access Token' , 'zendesk_access_token' ) . '</label>',
    function () {
      $option = get_option('zendesk_access_token');
      echo "<input id='zendesk_access_token' name='zendesk_access_token' type='text' class='regular-text' value='{$option}' />";
    },
    'ig',
    'ig_general'
  );
  add_settings_field(
    'zendesk_email_address',
    '<label for="zendesk_email_address">' . __( 'Zendesk Email Address' , 'zendesk_email_address' ) . '</label>',
    function () {
      $option = get_option('zendesk_email_address');
      echo "<input id='zendesk_email_address' name='zendesk_email_address' type='text' class='regular-text' value='{$option}' />";
    },
    'ig',
    'ig_general'
  );
  add_settings_field(
    'zendesk_subdomain',
    '<label for="zendesk_subdomain">' . __( 'Zendesk Subdomain' , 'zendesk_subdomain' ) . '</label>',
    function () {
      $option = get_option('zendesk_subdomain');
      echo "<input id='zendesk_subdomain' name='zendesk_subdomain' type='text' class='regular-text' value='{$option}' />";
    },
    'ig',
    'ig_general'
  );
} );

// add a settings page
add_action( 'admin_menu', function () {
  add_submenu_page(
    'options-general.php',
    'pnights Settings',
    'pnights',
    'manage_options',
    'ig',
    function () {
      if ( !current_user_can( 'manage_options' ) ) {
        return;
      }

      settings_errors( 'ig_messages' );?>

      <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post"><?php
          settings_fields( 'ig' );
          do_settings_sections( 'ig' );
          submit_button( 'Save Settings' );?>
        </form>
      </div><?php
    }
 );
} );
