<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( ! class_exists ( 'Uptous_WooCommerce_Order_Tracking' ) ) {

  class Uptous_WooCommerce_Order_Tracking {
    public function __construct($apiBaseUri) {
      $this->apiBaseUri = $apiBaseUri;
      $this->register_orders_integration_actions();
    }

    public function register_orders_integration_actions() {
      add_action('woocommerce_payment_complete', array( $this, 'orders_integration' ));
    }

    public function get_products($order, $currency) {
      $products = array();
      foreach ($order->get_items() as $item_key => $item ) {
          $item_data    = $item->get_data();
          $product_name = $item_data['name'];
          $product_id   = $item_data['product_id'];
          $quantity     = $item_data['quantity'];

          $product        = $item->get_product();
          $product_type   = $product->get_type();
          $product_sku    = $product->get_sku();
          $product_price  = $product->get_price();
          $stock_quantity = $product->get_stock_quantity();

          $product_json = array(
            'id' => $product_id,
            'quantity' => $quantity,
            'name' => $product_name,
            'price' => $product_price * 100,
            'currency' => $currency,
          );
          $products[] = $product_json;
      }
      return $products;
    }

    public function orders_integration($order_id) {
       $order = wc_get_order( $order_id );
       $order_data = $order->get_data();

       $order_fields_to_filter  = ['billing', 'shipping', 'customer_ip_address'];
       $order_data_filtered = array_filter(
          $order_data,
          function ($key) use ($order_fields_to_filter) {
              return !in_array($key, $order_fields_to_filter);
          },
          ARRAY_FILTER_USE_KEY
       );

       $currency = $order->get_currency();
       $order_total = $order_data['total'] * 100;

       $urlArr=parse_url($_SESSION['refererurl']);
       parse_str($urlArr['query'], $query);

       $token = get_option(uptous_private_api_key);

       if( !$query['aftk'] || !$token ) return;

       $body = array(
         'order' => array(
           'source' => 'woocommerce',
           'source_id' => $order_id,
           'amount_in_cents' => $order_total,
           'currency' => $currency,
           'products' => $this->get_products($order, $currency),
           'affiliate_token' => $query['aftk'],
           'payload' => $order_data_filtered,
         )
       );

       $urlparts = parse_url(home_url());
       $hostname = $urlparts['host'];
       $args = array(
         'method' => 'POST',
         'headers' => array(
             'Authorization' => "Plain $token",
             'Content-Type' => 'application/json',
             'Hostname' => $hostname,
         ),
         'body' => json_encode($body),
       );
       wp_remote_post( $this->apiBaseUri, $args );
     }
  }

}
