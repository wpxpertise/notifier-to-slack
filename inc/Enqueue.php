<?php
/**
 * Admin Chat Box Enqueue
 *
 * This class is used to enqueue ass assets
 *
 * @package WPNTS\Inc
 */
namespace WPNTS\Inc;

use \WPNTS\Inc\BaseController;
use \WPNTS\Inc\Database\DB;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * Enqueue Class is used to enqueue ass assets.
 *
 * @since 1.0.0
 */
class Enqueue extends BaseController {
	/**
	 * Register Instance.
	 *
	 * @since  1.0.0
	 */
	public function register() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'frondend_enqueue' ] );
	}
	/**
	 * This admin_enqueue function is used to enqueue.
	 *
	 * @param string $screen used to show the current screen path.
	 * @since  1.0.0
	 */
	public function admin_enqueue( $screen ) {
		/**
		 * WPNTS admin-all screen loaded file.
		 */
		if ( 'toplevel_page_wpnts_notifier' == $screen || 'notifier_page_wpnts_notifier_setting' == $screen || 'notifier_page_wpnts_notifier_authors' == $screen ) {
			
			remove_all_actions( 'admin_notices' );
			remove_all_actions( 'all_admin_notices' );

			
			wp_enqueue_style( 'wpnts_main_scss_style', WP_NOTIFIER_TO_SLACK_DIR_URL . 'build/index.css',[], time(),'all' );
			wp_enqueue_script( 'wcs_smtp_js', $this->plugin_url . 'assets/js/smtp.js',[ 'jquery' ],1.0,true );

			/**
			 * Main Script enqueue here
			 */
			$wpnts_db_instance = new DB();
			$dashboard_data = $wpnts_db_instance->get_all();

			wp_enqueue_script( 'wpnts_min_js', $this->plugin_url . 'build/index.js',[ 'jquery', 'wp-element', 'wp-util' ], time(),true );
			wp_localize_script('wpnts_min_js', 'appLocalizer', [
				'nonce' => wp_create_nonce( 'wp_rest'), 
				'wpntsUrl' => home_url( '/wp-json' ),
				'admin_ajax' => esc_url( admin_url( 'admin-ajax.php' ) ),
				'dashboard_data'  => $dashboard_data,
			] );
			wp_enqueue_script('wpnts_min_js');

		}

	}

	/**
	 * WPNTS public-all screen loaded file.
	 */
	public function frondend_enqueue() {
			/**
			 * Main Script enqueue here
			 */
			wp_enqueue_script( 'wpnts_public_min_js', $this->plugin_url . 'build/index.js',[ 'jquery', 'wp-element' ], time(),true );
			wp_localize_script('wpnts_public_min_js', 'appLocalizer', [
				'wpntsUrl' => home_url( '/wp-json' ),
				'nonce' => wp_create_nonce( 'wp_rest'),
			] );
			wp_enqueue_script('wpnts_public_min_js');
	}

}