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
 * WPNTS_Update used to rest route created
 *
 * @since 1.0.0
 */
class WPNTS_PluginUpdate
{

	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct()
	{
		$schedules_int = get_option('wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_updatenotification = isset($schedules_interval->updatenotification) ? $schedules_interval->updatenotification : 'false';

		add_filter('cron_schedules', [$this, 'wpnts_add_cron_interval']);

		if (true === $wpnts_updatenotification) {
			add_action('wpnts_corn_hook', [$this, 'wpnts_plugin_update_notification']);
		}
	}

	/**
	 * Corn setup time interval.
	 *
	 * @since 1.0.0
	 */
	public function wpnts_add_cron_interval()
	{

		$schedules_int = get_option('wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);
		$wpnts_time = $schedules_interval->interval_plugin_update ?? '120';

		$schedules['added_schedules_interval'] = [
			'interval' => isset($wpnts_time) ? $wpnts_time : 30,
			'display'  => esc_html__('Assigned Time in Seconds'),
		];
		return $schedules;
	}

	/**
	 * Review ticket get from the ORG and sendback to slack.
	 *
	 * @since 1.0.0
	 */
	public function wpnts_plugin_update_notification()
	{
		require_once ABSPATH . 'wp-admin/includes/plugin.php';

		$last_updates = get_option('wpnts_last_plugin_updates', 3);
		$current_time = time();

		$schedules_int = get_option('wpnts_schedules_interval_site_settings');
		$schedules_interval = json_decode($schedules_int);

		if (isset($schedules_interval->interval_plugin_update)) {
			$wpnts_time = $schedules_interval->interval_plugin_update ?? '100';
		}
		if (isset($schedules_interval->updatenotification)) {
			$updatenotification = $schedules_interval->updatenotification ?? 'false';
		}

		if (true === $updatenotification && isset($last_updates) && ($current_time - $last_updates) >= $wpnts_time) {

			$schedules_int = get_option('wpnts_schedules_interval_site_settings');
			$schedules_interval = json_decode($schedules_int);
			$wpnts_webhook = $schedules_interval->webhook;

			$slack_webhook_url = $wpnts_webhook;

			$plugins = get_plugins();

			foreach ($plugins as $plugin_slug => $plugin_data) {
				$last_update = isset($last_updates[$plugin_slug]) ? $last_updates[$plugin_slug] : 0;

				// Check for available plugin updates
				$plugin_updates = get_site_transient('update_plugins');

				if (isset($plugin_updates->response[$plugin_slug])) {
					$message = ':clap: A new version of the ' . $plugin_data['Name'] . ' plugin is available for update (' . $plugin_updates->response[$plugin_slug]->new_version . ').';
					$payload = json_encode(['text' => $message]);
					$args = [
						'body'        => $payload,
						'headers'     => ['Content-Type' => 'application/json'],
						'timeout'     => '5',
						'sslverify'   => false,
					];
					wp_remote_post($slack_webhook_url, $args);
				}
			}

			update_option('wpnts_last_plugin_updates', time());
		}
	}
}
