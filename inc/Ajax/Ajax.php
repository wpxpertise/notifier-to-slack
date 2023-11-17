<?php
/**
 * Admin Chat Box Rest Route
 *
 * This class is used to response and all rest route works
 *
 * @package WPNTS\Inc
 */

namespace WPNTS\Inc\Ajax;

use \WPNTS\Inc\Database\DB;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * Update used to rest route created
 *
 * @since 1.0.0
 */
class Ajax {

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
        add_action( 'wp_ajax_wpnts_dashboard_data', [ $this, 'get_all' ] );
	}

	public function get_all() {
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'wp_rest' ) ) {
			wp_send_json_error([
				'message' => __( 'Invalid nonce.', 'wpnts' ),
			]);
		}

        $wpnts_db_instance = new DB();
		$dashboard_data = $wpnts_db_instance->get_all();

		wp_send_json_success([
			'tables'       => $dashboard_data
		]);
	}

	

}
