<?php
/**
 * Admin Chat Box Datatable
 *
 * This class is used to builds all of the tables
 *
 * @package WPNTS\Inc
 */

namespace WPNTS\Inc;

defined('ABSPATH') || die('Hey, what are you doing here? You silly human!');
/**
 * WPNTS_DbTables Class Create Chat box database table
 *
 * @since 1.0.0
 */
final class WPNTS_DbTables {
	/**
	 * Holds the instance of the option table.
	 *
	 * @since 1.0.0
	 * @var WPNTS
	 */
	private $sql;
	/**
	 * Construct method.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		/**
		 * Default setting value.
		 */

		$wpnts_default_interval = [
			'interval' => 300,
			'webhook' => '',
			'reviewDays' => -7,
		];
		$wpnts_plugin_list = [
			'id' => '1',
			'title' => 'admin-chat-box',
			'content' => 'admin-chat-box',
		];

		add_option( 'wpnts_schedules_interval', json_encode($wpnts_default_interval) );
		add_option( 'wpnts_plugin_list', json_encode($wpnts_plugin_list) );
		add_option( 'wpnts_review_last_sent_time', 0 );
		add_option( 'wpnts_last_sent_time', 0 );

	}

}
