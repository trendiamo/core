<?php
/**
 * Plugin Name: UpToUs
 * Description: The network that connects brands and influencers to create positive impact on a performance-basis.
 * Version: 1.0.0
 * Author: Trendiamo Unipessoal LDA
 * Author URI: https://uptous.co
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

function include_snippet() {
 $content = "<script>
    !(function(f, r, e, k, k, l, s) {
      function load() {
        var s1 = r.createElement('script'),
          s2 = r.getElementsByTagName('script')[0]
        s1.src = 'https://js.frekkls.com/tracker.js'
        s1.charset = 'utf-8'
        s2.parentNode.insertBefore(s1, s2)
      }
      r.readyState === 'complete' ? load() : f.addEventListener('load', load)
    })(window, document)
  </script>";
 echo $content;
}

function uptous_init() {
  $apiBaseUri = "https://api.frekkls.com/shop_api/v1/orders";
  if ( is_admin() ) {
    // include uptous settings admin page
    require_once plugin_dir_path( __FILE__ ) . 'includes/settings.php';
  }
  // include uptous snippet
  add_action('wp_footer', 'include_snippet');
  // load required class
  require_once plugin_dir_path( __FILE__ ) . 'includes/classes.php';
  new Uptous_WooCommerce_Order_Tracking($apiBaseUri);
}

function uptous_install_woocommerce_admin_notice() {
  ?>
  <div class="error">
    <p><?php _e( 'UpToUs WooCommerce Order Tracking requires WooCommerce in order to work.'); ?></p>
  </div>
  <?php
}

if( !session_id() )
{
  session_start();
}

if(!isset($_SESSION['landing_url'])) {
    $_SESSION['landing_url'] = $_SERVER['REQUEST_URI'];
}

add_action( 'uptous_init', 'uptous_init' );

$active_plugins = apply_filters( 'active_plugins', get_option( 'active_plugins' ) );
if ( in_array( 'woocommerce/woocommerce.php', $active_plugins ) ) {
  // Woocommerce plugin is active
  do_action( 'uptous_init' );
} else {
  add_action( 'admin_notices', 'uptous_install_woocommerce_admin_notice' );
}
