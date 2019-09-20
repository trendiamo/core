<?php

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

if ( ! class_exists( 'Uptous_WooCommerce_Settings' ) ) {
	function add_uptous_settings() {

		class Uptous_WooCommerce_Settings extends WC_Settings_Page {
			public function __construct() {

				$this->id    = 'uptous';
				$this->label = __( 'UpToUs' );

				add_filter( 'woocommerce_settings_tabs_array',        array( $this, 'add_settings_page' ), 20 );
				add_action( 'woocommerce_settings_' . $this->id,      array( $this, 'output' ) );
				add_action( 'woocommerce_settings_save_' . $this->id, array( $this, 'save' ) );
				add_action( 'woocommerce_sections_' . $this->id,      array( $this, 'output_sections' ) );
			}

			public function get_settings( ) {

					$settings = apply_filters( 'foo', array(
						array(
							'name' => __( 'UpToUs Settings'),
							'type' => 'title',
							'desc' => '',
							'id'   => 'uptous_settings',
						),
						array(
							'type'     => 'text',
							'id'       => 'uptous_private_api_key',
							'name'     => __( 'Private API Key'),
							'default'  => '',
						),
	          array(
	            'type' => 'sectionend',
	            'id'   => 'uptous_settings'
	          ),
					) );
				return apply_filters( 'woocommerce_get_settings_' . $this->id, $settings );
			}

			public function output() {
				$settings = $this->get_settings();
				WC_Admin_Settings::output_fields( $settings );
			}

			public function save() {
				$settings = $this->get_settings();
				WC_Admin_Settings::save_fields( $settings );
			}
		}

		return new Uptous_WooCommerce_Settings();
	}

	add_filter( 'woocommerce_get_settings_pages', 'add_uptous_settings' );
}
