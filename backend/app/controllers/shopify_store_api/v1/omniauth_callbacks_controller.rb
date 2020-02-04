module ShopifyStoreApi
  module V1
    class OmniauthCallbacksController < Devise::OmniauthCallbacksController
      def google
        auth = request.env['omniauth.auth']
        @shopify_customer = ShopifyCustomer.from_omniauth(auth)
        if @shopify_customer.persisted?
          source_password = OpenSSL::HMAC.hexdigest(
            ENV["SHOPIFY_AUTH_HASH_METHOD"], ENV["SHOPIFY_AUTH_HASH_KEY"], @shopify_customer.password
          )
          create_customer_in_shopify(auth, source_password)

          return redirect_to "https://hellodude23.myshopify.com/pages/oauth-form?email=#{@shopify_customer.email}&password=#{source_password}"
        else
          session["devise.google_data"] = auth.except(:extra)
        end
        redirect_to "https://hello.com"
      end

      def facebook
        auth = request.env['omniauth.auth']

        p '======================================='
        p auth
        p '======================================='

        @shopify_customer = ShopifyCustomer.from_omniauth(auth)
        if @shopify_customer.persisted?
          source_password = OpenSSL::HMAC.hexdigest(
            ENV["SHOPIFY_AUTH_HASH_METHOD"], ENV["SHOPIFY_AUTH_HASH_KEY"], @shopify_customer.password
          )
          create_customer_in_shopify(auth, source_password)

          return redirect_to "https://hellodude23.myshopify.com/pages/oauth-form?email=#{@shopify_customer.email}&password=#{source_password}"
        else
          session["devise.google_data"] = auth.except(:extra)
        end
        redirect_to "https://hello.com"
      end

      def create_customer_in_shopify(auth, source_password)
        if shopify_customer_exists(auth)
          return
        end

        shopify_customer = {
          email: auth.info.email,
          first_name: auth.info.given_name,
          second_name: auth.info.family_name,
          password: source_password,
          password_confirmation: source_password,
        }
        # return false
        response = HTTParty.post("https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers.json",
              :body => { customer: shopify_customer }.to_json,
              :headers => {'Content-Type' => 'application/json'})
        response&.parsed_response["customer"]
      end

      def shopify_customer_exists(auth)
        response = HTTParty.get("https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers.json?email=#{auth.info.email}",
              :headers => {'Content-Type' => 'application/json'})
        response&.parsed_response["customers"].count == 1
      end

    end
  end
end
