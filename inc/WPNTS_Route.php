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

	}

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
	 * Set webhook page.
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

}
