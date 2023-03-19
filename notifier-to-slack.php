<?php
/**
 * Plugin Name: Notifier To Slack
 *
 * @author            Sabbir Sam, devsabbirahmed
 * @copyright         2023- devsabbirahmed
 * @license           GPL-2.0-or-later
 * @package WP-Notifier-To-Slack	
 *
 * @wordpress-plugin
 * Plugin Name: Notifier To Slack
 * Plugin URI: https://github.com/sabbirsam/wp-notifier-to-slack
 * Description: Notifier To Slack is a WordPress plugin that allows users to receive instant notifications of their plugin activity, review and support requests directly in their Slack workspace.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      5.6
 * Author:            SABBIRSAM
 * Author URI:        https://github.com/sabbirsam/
 * Text Domain:       wpnts
 * Domain Path: /languages/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If direct access than exit the file.
defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
define( 'WP_NOTIFIER_TO_SLACK_VERSION', '2.0.0' );
define( 'WP_NOTIFIER_TO_SLACK__FILE__', __FILE__ );
define( 'WP_NOTIFIER_TO_SLACK_DIR', __DIR__ );
define( 'WP_NOTIFIER_TO_SLACK_DIR_PATH', plugin_dir_path( WP_NOTIFIER_TO_SLACK__FILE__ ) );
define( 'WP_NOTIFIER_TO_SLACK_URL', plugins_url( '', __FILE__ ) );
define( 'WP_NOTIFIER_TO_SLACK_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'WP_NOTIFIER_TO_SLACK_NAME', plugin_dir_url( __FILE__ ) );

if ( file_exists(dirname(__FILE__) . '/vendor/autoload.php') ) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}


/**
 * All Namespace.
 */
use WPNTS\Inc\WPNTS_Route;
use WPNTS\Inc\WPNTS_Enqueue;
use WPNTS\Inc\WPNTS_Activate;
use WPNTS\Inc\WPNTS_DbTables;
use WPNTS\Inc\WPNTS_Deactivate;
use WPNTS\Inc\WPNTS_AdminDashboard;
use WPNTS\Inc\WPNTS_BaseController;
use WPNTS\Inc\WPNTS_NotifierReview;
use WPNTS\Inc\WPNTS_NotifierSupport;


if ( ! class_exists('WPNTS_Notifier') ) {
	/**
	 * Main plugin class.
	 *
	 * @since 1.0.0
	 */
	class WPNTS_Notifier {
		/**
		 * Holds the plugin base file
		 *
		 * @since 1.0.0
		 * @var WPNTS
		 */
		public $WP_NOTIFIER_TO_SLACK;
		/**
		 * Constructor of the plugin.
		 *
		 * @since 1.0.0
		 * @var WPNTS
		 */
		public function __construct() {
			$this->includes();
			$this->WP_NOTIFIER_TO_SLACK = plugin_basename(__FILE__);
		}
		/**
		 * Register
		 */
		public function register() {
			add_action('plugins_loaded', [ $this, 'wpnts_load' ]);
			add_action('activated_plugin', [ $this, 'wpnts_plugin_activation' ]);

		}
		/**
		 * Main Plugin Instance.
		 *
		 * Insures that only one instance of the addon exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 */
		public static function wpnts_load() {
			load_plugin_textdomain('wpnts', false,dirname(__FILE__) . 'languages');
		}
		/**
		 * Classes instantiating here.
		 */
		public function includes() {
			new WPNTS_AdminDashboard();
			$enqueue = new WPNTS_Enqueue();
			$enqueue->register();
			new WPNTS_BaseController();
			new WPNTS_DbTables();
			new WPNTS_Route();

			$load_support = new WPNTS_NotifierSupport();
			$load_support->wpnts_support_tickets();

			$load_review = new WPNTS_NotifierReview();
			$load_review->wpnts_review_tickets();

		}
		/**
		 * While active the plugin redirect.
		 *
		 * @param string $plugin redirect to the dashboard.
		 * @since 1.0.0
		 */
		public function wpnts_plugin_activation( $plugin ) {
			if ( plugin_basename(__FILE__) == $plugin ) {
				wp_redirect(admin_url('admin.php?page=wpnts_notifier'));
				die();
			}
		}
		/**
		 * Activation Hook
		 */
		public function wpnts_activate() {
			WPNTS_Activate::wpnts_activate();
		}
		/**
		 * Deactivation Hook
		 */
		public function wpnts_deactivate() {
			WPNTS_Deactivate::wpnts_deactivate();
		}
	}
	/**
	 * Instantiate an Object Class
	 */
	$wpnts = new WPNTS_Notifier();
	$wpnts->register();


	register_activation_hook (WP_NOTIFIER_TO_SLACK__FILE__, [ $wpnts, 'wpnts_activate' ] );
	register_deactivation_hook (WP_NOTIFIER_TO_SLACK__FILE__, [ $wpnts, 'wpnts_deactivate' ] );
}
