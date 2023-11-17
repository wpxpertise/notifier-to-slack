<?php
/**
 * Admin Chat Box Rest Route
 *
 * This class is used to response and all rest route works
 *
 * @package WPNTS\Inc
 */

namespace WPNTS\Inc\Database;


defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * Update used to rest route created
 *
 * @since 1.0.0
 */
class DB {

	public function get_all() {
        $response = [];
		$site_status_transient = get_transient( 'health-check-site-status-result' );

		$site_status = json_decode( $site_status_transient, true );

		if($site_status){
			$status_data = [
				'good' => $site_status['good'],
				'recommended' => $site_status['recommended'],
				'critical' => $site_status['critical'],
			];
		}else{
			$status_data = [
				'good' => '',
				'recommended' => '',
				'critical' => '',
			];
		}

		// Get the total plugin update count from the option table.
		$total_plugin_updates = get_option( 'wpnts_total_plugin_updates', 0 );
		$activated_plugins_data = get_option( 'wpnts_activated_plugins', [] );
		$deactivated_plugins_data = get_option( 'wpnts_deactivated_plugins', [] );
		$wpnts_user_login_info = get_option( 'wpnts_user_login_info', [] );

		$wpnts_user_daily_login_info = get_option( 'wpnts_user_daily_login_info', [] );
		$wpnts_user_track_failed_login = get_option( 'wpnts_user_track_failed_login', [] );

		// You can add more data to the response array if needed.
		$response['total_plugin_updates'] = $total_plugin_updates;

		// Check if the activated plugins list was updated in the last 24 hours.
		$current_time = time();

		// Activated plugin list
		if ( isset( $activated_plugins_data['last_updated'] ) && ( $current_time - $activated_plugins_data['last_updated'] ) < 86400 ) {
			$activated_plugins_list = isset( $activated_plugins_data['plugins'] ) ? $activated_plugins_data['plugins'] : [];
			$response['wpnts_activated_plugins'] = $activated_plugins_list;
		} else {
			// If more than 24 hours have passed, reset the list.
			$response['wpnts_activated_plugins'] = [];
		}

		// Deactivated plugin list
		if ( isset( $deactivated_plugins_data['last_updated'] ) && ( $current_time - $deactivated_plugins_data['last_updated'] ) < 86400 ) {
			$deactivated_plugins_list = isset( $deactivated_plugins_data['plugins'] ) ? $deactivated_plugins_data['plugins'] : [];
			$response['wpnts_deactivated_plugins'] = $deactivated_plugins_list;
		} else {
			// If more than 24 hours have passed, reset the list.
			$response['wpnts_deactivated_plugins'] = [];
		}

		// Logged in and logout in last 24
		$response['wpnts_user_login_info'] = $wpnts_user_login_info;
		$response['wpnts_user_daily_login_info'] = $wpnts_user_daily_login_info;
		$response['wpnts_user_track_failed_login'] = $wpnts_user_track_failed_login;
		$response['wpnts_site_health'] = $status_data;

		// Return the response as JSON.
		return $response;
	}

	

}
