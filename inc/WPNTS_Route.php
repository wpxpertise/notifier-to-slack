<?php
/**
 * Admin Chat Box Rest Route
 *
 * This class is used to response and all rest route works
 *
 * @package WPNTS\Inc
 */

namespace WPNTS\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * WPNTS_Route used to rest route created
 *
 * @since 1.0.0
 */
class WPNTS_Route {

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'wpnts_create_rest_route' ] );
	}
	/**
	 * Admin Menu pages
	 *
	 * @since 1.0.0
	 */
	public function wpnts_create_rest_route() {
		/**
		 * Credentials: Save
		 */
		register_rest_route( 'wpnts/v1', '/org_plugin_name',[
			'methods' => 'POST',
			'callback' => [ $this, 'set_plugin_name' ],
			'permission_callback' => [ $this, 'set_plugin_name_permission' ],
		] );
		register_rest_route( 'wpnts/v1', '/slack_webhook_interval',[
			'methods' => 'POST',
			'callback' => [ $this, 'set_slack_webhook' ],
			'permission_callback' => [ $this, 'set_slack_webhook_permission' ],
		] );
		register_rest_route( 'wpnts/v1', '/register',[
			'methods' => 'POST',
			'callback' => [ $this, 'get_register_users' ],
			'permission_callback' => [ $this, 'get_register_users_permission' ],
		] );
		register_rest_route( 'wpnts/v1', '/slack_webhook_interval_site_settings',[
			'methods' => 'POST',
			'callback' => [ $this, 'set_slack_webhook_site_settings' ],
			'permission_callback' => [ $this, 'set_slack_webhook_permission_site_settings' ],
		] );
		register_rest_route( 'wpnts/v1', '/woocommerce_status',[
			'methods' => 'GET',
			'callback' => [ $this, 'get_woocommercewoocommerce_status_endpoint' ],
			'permission_callback' => [ $this, 'get_woocommercewoocommerce_status_endpoint_permission' ],
		] );
		register_rest_route( 'wpnts/v1', '/slack_webhook_interval_woocommerce_settings',[
			'methods' => 'POST',
			'callback' => [ $this, 'set_slack_webhook_woocommerce_settings' ],
			'permission_callback' => [ $this, 'set_slack_webhook_permission_woocommerce_settings' ],
		] );

		register_rest_route( 'wpnts/v1', '/slack_webhook_site_security_settings',[
			'methods' => 'POST',
			'callback' => [ $this, 'set_slack__webhook_site_security_settings' ],
			'permission_callback' => [ $this, 'set_slack_webhook_permission_site_security_settings' ],
		] );

	}
	// ------------------------------------------------------------------------------------------//
	/**
	 * Plugin name add.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function set_plugin_name( $req ) {

		$pluginList    = isset( $req['updatePluginslist'] ) ? rest_sanitize_array( wp_unslash($req['updatePluginslist']) ) : [];

		if ( $pluginList ) {
			update_option( 'wpnts_plugin_list', json_encode($pluginList) );
			return rest_ensure_response(1);
			wp_die();
		} else {
			return rest_ensure_response(0);
			wp_die();
		}
	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_plugin_name_permission() {
		return true;
	}

	/**
	 * Registration and subscription.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function get_register_users( $req ) {
		$acceptRegistrtion = sanitize_text_field($req ['id']) ?? '';

		if ( $acceptRegistrtion ) {
			$current_user = wp_get_current_user();
			$user_email = $current_user->user_email;
		}

		if ( $success ) {
			return rest_ensure_response("$user_email ");
			wp_die();
		} else {
			return rest_ensure_response("$user_email ");
			wp_die();
		}

	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function get_register_users_permission() {
		return current_user_can( 'publish_posts' );
	}

	// --------------------------------------------------------------------------------------------------//
	/**
	 * Set webhook page for author settings.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function set_slack_webhook( $req ) {

		// $webhook_interval    = isset( $req['wpntswebhook'] ) ? rest_sanitize_array( wp_unslash($req['wpntswebhook']) ) : array();
		$webhook_interval    = isset( $req['wpntswebhook'] ) ? rest_sanitize_object( wp_unslash($req['wpntswebhook']) ) : [];

		if ( $webhook_interval ) {
			update_option( 'wpnts_schedules_interval', json_encode($webhook_interval) );
			return rest_ensure_response(1);
			wp_die();
		} else {
			return rest_ensure_response(0);
			wp_die();
		}
	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_slack_webhook_permission() {
		return true;
	}
	// -------------------------------------------------------------------------------------------//
	/**
	 * Set webhook page for site settings.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function set_slack_webhook_site_settings( $req ) {

		$webhook_interval    = isset( $req['wpntswebhook_site_settings'] ) ? rest_sanitize_object( wp_unslash($req['wpntswebhook_site_settings']) ) : [];

		if ( $webhook_interval ) {
			update_option( 'wpnts_schedules_interval_site_settings', json_encode($webhook_interval) );
			return rest_ensure_response(1);
			wp_die();
		} else {
			return rest_ensure_response(0);
			wp_die();
		}
	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_slack_webhook_permission_site_settings() {
		return true;
	}

	/**
	 * Check Woocommerce install or not.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */

	public function get_woocommercewoocommerce_status_endpoint() {
		$cf7_is_installed = is_plugin_active('woocommerce/woocommerce.php');
		if ( $cf7_is_installed ) {
			return rest_ensure_response($cf7_is_installed);
		} else {
			return rest_ensure_response($cf7_is_installed);
		}
		wp_die();

	}
	public function get_woocommercewoocommerce_status_endpoint_permission() {
		return true; }


	/**
	 * Set webhook page for woocommerce settings.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function set_slack_webhook_woocommerce_settings( $req ) {

		$webhook_interval    = isset( $req['wpntswebhook_woocommerce_settings'] ) ? rest_sanitize_object( wp_unslash($req['wpntswebhook_woocommerce_settings']) ) : [];

		if ( $webhook_interval ) {
			update_option( 'wpnts_schedules_interval_woocommerce_settings', json_encode($webhook_interval) );
			return rest_ensure_response(1);
			wp_die();
		} else {
			return rest_ensure_response(0);
			wp_die();
		}
	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_slack_webhook_permission_woocommerce_settings() {
		return true;
	}


	/**
	 * Set webhook page for site security settings.
	 *
	 * @param WP_Request_Object $req WordPress request object.
	 * @since 1.0.0
	 */
	public function set_slack__webhook_site_security_settings( $req ) {

		$reuest_data    = isset( $req['wpntswebhook_site_settings'] ) ? rest_sanitize_object( wp_unslash($req['wpntswebhook_site_settings']) ) : [];

		if ( $reuest_data ) {
			update_option( 'wpnts_webhook_site_settings', json_encode($reuest_data) );
			return rest_ensure_response(1);
			wp_die();
		} else {
			return rest_ensure_response(0);
			wp_die();
		}
	}
	/**
	 * Rest route save permission.
	 *
	 * @since 1.0.0
	 */
	public function set_slack_webhook_permission_site_security_settings() {
		return true;
	}

}