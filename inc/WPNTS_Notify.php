<?php
/**
 * Admin Chat Box Rest Route
 *
 * This class is used to response and all rest route works
 *
 * @package WPNTS\Inc
 */

namespace WPNTS\Inc;

use \WPNTS\Inc\WPNTS_Activate;
use \WPNTS\Inc\WPNTS_Deactivate;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * WPNTS_Notify used to rest route created
 *
 * @since 1.0.0
 */
class WPNTS_Notify {

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_pluginactivation = $schedules_interval->pluginactivation ?? 'false';
		$wpnts_plugindeactivation = $schedules_interval->plugindeactivation ?? 'false';
		$wpnts_loginandout = $schedules_interval->loginandout ?? 'false';
		$wpnts_sitehelgth = $schedules_interval->sitehelgth ?? 'false';
		$wpnts_registration = $schedules_interval->registration ?? 'false';

		// Action hook for plugin activated.
		if ( true === $wpnts_pluginactivation ) {
			add_action( 'activated_plugin', [ $this, 'wpnts_plugin_activation' ], 10, 2 );
		}

		// Action hook for plugin deactivation.
		if ( true === $wpnts_plugindeactivation ) {
			add_action( 'deactivated_plugin', [ $this, 'wpnts_plugin_deactivated' ], 10, 2 );
		}

		// Site Helgth.
		if ( true === $wpnts_sitehelgth ) {
			 add_action( 'wpnts_corn_hook', [ $this, 'wpnts_site_health_status_notification' ] );
		}

		// Login and Logout.
		if ( true === $wpnts_loginandout ) {
			add_action( 'wp_login',[ $this, 'wpnts_user_activity_notification_login' ], 10, 2 );
			add_action( 'wp_logout',[ $this, 'wpnts_user_activity_notification_logout' ] );
		}
		// New registration.
		if ( true === $wpnts_registration ) {
			add_action( 'user_register',[ $this, 'wpnts_new_user_notification' ], 10, 1 );
		}

	}
	/**
	 * Plugin activation notification.
	 *
	 * @since 1.0.0
	 */
	public function wpnts_plugin_activation( $plugin, $network_wide ) {
		$current_user = wp_get_current_user();
		$current_user_name = $current_user->display_name;

		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_webhook = $schedules_interval->webhook;

		$slack_webhook_url = $wpnts_webhook;

		$message = ':face_with_peeking_eye: Plugin ' . $plugin . ' has been *activated* by :arrow_right: ' . $current_user_name;
		$payload = json_encode( [ 'text' => $message ] );
		$args = [
			'body'        => $payload,
			'headers'     => [ 'Content-Type' => 'application/json' ],
			'timeout'     => '5',
			'sslverify'   => false,
		];
		$response = wp_remote_post( $slack_webhook_url, $args );
	}

	/**
	 * Plugin deactive notification.
	 */
	public function wpnts_plugin_deactivated( $plugin, $network_deactivating ) {

		$current_user = wp_get_current_user();
		$current_user_name = $current_user->display_name;

		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_webhook = $schedules_interval->webhook;

		$slack_webhook_url = $wpnts_webhook;

		$message = ':face_with_raised_eyebrow: Plugin ' . $plugin . ' has been *deactivated* by :arrow_right: ' . $current_user_name;
		$payload = json_encode( [ 'text' => $message ] );
		$args = [
			'body'        => $payload,
			'headers'     => [ 'Content-Type' => 'application/json' ],
			'timeout'     => '5',
			'sslverify'   => false,
		];
		$response = wp_remote_post( $slack_webhook_url, $args );
	}
	/**
	 * Site Health notification
	 */
	public function wpnts_site_health_status_notification() {

		$last_updates = get_option( 'wpnts_last_sitestatus_updates' );
		$current_time = time();

		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_time = $schedules_interval->interval_sitehelgth_update ?? '10';
		$wpnts_webhook = $schedules_interval->webhook;
		$sitehelgth = $schedules_interval->sitehelgth ?? 'false';

		if ( true === $sitehelgth && isset($last_updates) && ( $current_time - $last_updates ) >= $wpnts_time ) {

			$slack_webhook_url = $wpnts_webhook;

			$site_status_transient = get_transient( 'health-check-site-status-result' );
			$site_status = json_decode( $site_status_transient, true );

			print_r($site_status);

			// Format the site health status as a string
			$status_message = ':fire: Site Health Status: Good=' . $site_status['good'] . ', Recommended=' . $site_status['recommended'] . ', Critical=' . $site_status['critical'] . "\n";
			$status_message .= ':arrow_right: ' . '<' . get_bloginfo('url') . '/wp-admin/site-health.php|View details>';

			$payload = json_encode( [ 'text' => $status_message ] );
			$args = [
				'body'        => $payload,
				'headers'     => [ 'Content-Type' => 'application/json' ],
				'timeout'     => '5',
				'sslverify'   => false,
			];
			$response = wp_remote_post( $slack_webhook_url, $args );

			update_option( 'wpnts_last_sitestatus_updates', time() );
		}
	}

	/**
	 * Login and logout
	 */
	public function wpnts_user_activity_notification_login( $user_login, $user ) {
		 $schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_webhook = $schedules_interval->webhook;

		$slack_webhook_url = $wpnts_webhook;

		$message = ":yawning_face: User $user_login has logged in.";
		$payload = json_encode( [ 'text' => $message ] );
		$args = [
			'body'        => $payload,
			'headers'     => [ 'Content-Type' => 'application/json' ],
			'timeout'     => '5',
			'sslverify'   => false,
		];
		$response = wp_remote_post( $slack_webhook_url, $args );

		session_start();
		$_SESSION['wpnts_user_display_name'] = $user->display_name;

	}
	/**
	 * Logout Notification
	 */
	public function wpnts_user_activity_notification_logout() {
		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_webhook = $schedules_interval->webhook;

		$slack_webhook_url = $wpnts_webhook;

		session_start();
		$user_display_name = isset( $_SESSION['wpnts_user_display_name'] ) ? $_SESSION['wpnts_user_display_name'] : '';

		$message = ":smiling_face_with_tear: User $user_display_name has logged out.";

		$payload = json_encode( [ 'text' => $message ] );
		$args = [
			'body'        => $payload,
			'headers'     => [ 'Content-Type' => 'application/json' ],
			'timeout'     => '5',
			'sslverify'   => false,
		];
		$response = wp_remote_post( $slack_webhook_url, $args );
	}

	/**
	 * New user register to my site Notifications to Slack.
	 */
	public function wpnts_new_user_notification( $user_id ) {
		$user = get_userdata( $user_id );
		$schedules_int = get_option( 'wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_webhook = $schedules_interval->webhook;

		$slack_webhook_url = $wpnts_webhook;

		$message = "New user registered on your site:\n\nUsername: " . $user->user_login . "\nEmail: " . $user->user_email;
		$payload = json_encode( [ 'text' => $message ] );
		$args = [
			'body'        => $payload,
			'headers'     => [ 'Content-Type' => 'application/json' ],
			'timeout'     => '5',
			'sslverify'   => false,
		];
		$response = wp_remote_post( $slack_webhook_url, $args );
	}


}
