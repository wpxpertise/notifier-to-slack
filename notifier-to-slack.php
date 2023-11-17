<?php
/**
 * Plugin Name: Notifier To Slack
 *
 * @author            wpxpertise, devsabbirahmed
 * @copyright         2023- wpxpertise
 * @license           GPL-2.0-or-later
 * @package WP-Notifier-To-Slack
 *
 * @wordpress-plugin
 * Plugin Name: Notifier To Slack
 * Plugin URI: https://github.com/wpxpertise/
 * Description: Notifier To Slack allows users to receive instant notifications of their plugin activity, review and support requests directly in their Slack workspace.
 * Version:           1.9.0
 * Requires at least: 5.9
 * Requires PHP:      5.6
 * Author:            WPXpertise
 * Author URI:        https://github.com/wpxpertise/
 * Text Domain:       wpnts
 * Domain Path: /languages/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If direct access than exit the file.
defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
define( 'WP_NOTIFIER_TO_SLACK_VERSION', '1.9.0' );
define( 'WP_NOTIFIER_TO_SLACK__FILE__', __FILE__ );
define( 'WP_NOTIFIER_TO_SLACK_DIR', __DIR__ );
define( 'WP_NOTIFIER_TO_SLACK_DIR_PATH', plugin_dir_path( WP_NOTIFIER_TO_SLACK__FILE__ ) );
define( 'WP_NOTIFIER_TO_SLACK_URL', plugins_url( '', __FILE__ ) );
define( 'WP_NOTIFIER_TO_SLACK_DIR_URL', plugin_dir_url( __FILE__ ) ); // Directory URL.
define( 'WP_NOTIFIER_TO_SLACK_NAME', plugin_dir_url( __FILE__ ) );

if ( file_exists(dirname(__FILE__) . '/vendor/autoload.php') ) {
	require_once dirname(__FILE__) . '/vendor/autoload.php';
}


/**
 * All Namespace.
 */
use WPNTS\Inc\Ajax\Ajax;
use WPNTS\Inc\Route;
use WPNTS\Inc\Notify;
use WPNTS\Inc\Enqueue;
use WPNTS\Inc\WPUpdate;
use WPNTS\Inc\Activate;
use WPNTS\Inc\Security;
use WPNTS\Inc\DbTables;
use WPNTS\Inc\Deactivate;
use WPNTS\Inc\Database\DB;
use WPNTS\Inc\WooCommerce;
use WPNTS\Inc\PluginUpdate;
use WPNTS\Inc\AdminDashboard;
use WPNTS\Inc\BaseController;
use WPNTS\Inc\NotifierReview;
use WPNTS\Inc\NotifierSupport;
use WPNTS\Inc\SlackAttachment;


if ( ! class_exists('Notifier') ) {
	/**
	 * Main plugin class.
	 *
	 * @since 1.0.0
	 */
	class Notifier {
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
		 * Main Plugin Textdomain.
		 */
		public static function wpnts_load() {
			load_plugin_textdomain('wpnts', false,dirname(__FILE__) . 'languages');
		}
		/**
		 * Classes instantiating here.
		 */
		public function includes() {
			new AdminDashboard();
			$enqueue = new Enqueue();
			$enqueue->register();
			
			new BaseController();
			new DbTables();
			new Route();
			
			//Calling Ajax.
			new Ajax(); 

			// Active and Deactivation notification.
			$active  = new Notify();

			// All plugin update notification.
			$update = new PluginUpdate();
			$update->wpnts_plugin_update_notification();

			// WordPress Core version update notification.
			$wpupdate = new WPUpdate();
			$wpupdate->wpnts_wordpress_core_update();

			// Plugin ORG support case notification.
			$load_support = new NotifierSupport();
			$load_support->wpnts_support_tickets();

			// Plugin review notification.
			$load_review = new NotifierReview();
			$load_review->wpnts_review_tickets();
			$woocoomerce_product = new WooCommerce();
			$security_acess = new Security();
			$slackattachment = new SlackAttachment();
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
			Activate::wpnts_activate();
		}
		/**
		 * Deactivation Hook
		 */
		public function wpnts_deactivate() {
			Deactivate::wpnts_deactivate();
		}
	}
	/**
	 * Instantiate an Object Class
	 */
	$wpnts = new Notifier();
	$wpnts->register();


	register_activation_hook (WP_NOTIFIER_TO_SLACK__FILE__, [ $wpnts, 'wpnts_activate' ] );
	register_deactivation_hook (WP_NOTIFIER_TO_SLACK__FILE__, [ $wpnts, 'wpnts_deactivate' ] );
}