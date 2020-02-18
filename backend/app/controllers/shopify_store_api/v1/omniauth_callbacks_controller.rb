module ShopifyStoreApi
  module V1
    class OmniauthCallbacksController < Devise::OmniauthCallbacksController
      def google
        basic_oauth_flow
      end

      def facebook
        basic_oauth_flow
      end

      def basic_oauth_flow # rubocop:disable Metrics/MethodLength
        auth = request.env["omniauth.auth"]

        @shopify_customer = ShopifyCustomer.from_omniauth(auth)
        if @shopify_customer.persisted?
          source_password = encrypt_password
          create_customer_in_shopify(auth, source_password)
          oauth_page_url = "https://#{ENV['SHOPIFY_STORE_URL']}/pages/oauth"
          redirect_url = "#{oauth_page_url}?email=#{@shopify_customer.email}&password=#{source_password}"
        else
          session["devise.google_data"] = auth.except(:extra)
          redirect_url = "https://#{ENV['SHOPIFY_STORE_URL']}"
        end
        redirect_to redirect_url
      end

      def encrypt_password
        source_password = OpenSSL::HMAC.hexdigest(
          ENV["SHOPIFY_AUTH_HASH_METHOD"], ENV["SHOPIFY_AUTH_HASH_KEY"], @shopify_customer.password
        )
        source_password[source_password.length - 40..source_password.length]
      end

      def create_customer_in_shopify(auth, source_password)
        return if shopify_customer_exists(auth)

        shopify_customer = shopify_customer_object(auth, source_password)
        response = HTTParty.post("#{api_endpoint_url}/customers.json",
                                 body: { customer: shopify_customer }.to_json,
                                 headers: { "Content-Type" => "application/json" })

        response && response.parsed_response["customer"]
      end

      def shopify_customer_object(auth, source_password)
        {
          email: auth.info.email,
          first_name: auth.info.given_name,
          second_name: auth.info.family_name,
          password: source_password,
          password_confirmation: source_password,
        }
      end

      def api_endpoint_url
        "https://#{ENV['SHOPIFY_APP_KEY']}:#{ENV['SHOPIFY_APP_PASSWORD']}@#{ENV['SHOPIFY_STORE_API_URL']}"
      end

      def shopify_customer_exists(auth)
        response = HTTParty.get("#{api_endpoint_url}/customers.json?email=#{auth.info.email}",
                                headers: { "Content-Type" => "application/json" })
        response && response.parsed_response["customers"].count == 1
      end
    end
  end
end
