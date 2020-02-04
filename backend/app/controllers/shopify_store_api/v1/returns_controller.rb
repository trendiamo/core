require "httparty"

module ShopifyStoreApi
  module V1
    class ReturnsController < RestController
      before_action :authenticate
      before_action :check_user_key

      def toggle

        user_key_header = request.headers["Userkey"]

        customer_email = user_key_header.split(":")[0]

        customer = get_shopify_customer(customer_email)

        tags = customer["tags"].split(", ")

        second_discount_applied = tags.include?("uptous-no-returns")

        new_tags = second_discount_applied ? 'discounted-clients' : 'discounted-clients, uptous-no-returns'

        new_customer = {
          tags: new_tags,
        }

        # Update a shopify customer
        # https://ENV['SHOPIFY_APP_KEY']:ENV['SHOPIFY_APP_PASSWORD']@hellodude23.myshopify.com/admin/api/2019-10/customers.json
        response = HTTParty.put("https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers/#{customer["id"]}.json",
              :body => { customer: new_customer }.to_json,
              :headers => {'Content-Type' => 'application/json'})

        render json: { tags: new_tags }
      end

      private

      def render_error
        errors = @order.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def authenticate
        auth_header = request.headers["Authorization"]
        return if auth_header == "Plain #{ENV['SHOPIFY_API_TOKEN']}"


        user_not_authorized
      end

      def check_user_key
        user_key_header = request.headers["Userkey"]

        customer_email = user_key_header.split(":")[0]
        customer_id = user_key_header.split(":")[1]

        response = HTTParty.get("https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers/#{customer_id}.json",
              :headers => {'Content-Type' => 'application/json'})

        customer = response&.parsed_response["customer"]

        if response.code == 200 && customer && customer["email"] == customer_email
          @customer = customer
          return
        end
        user_not_authorized
      end

      def get_shopify_customer(email)
        response = HTTParty.get(
          "https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers.json?email=#{email}",
          headers: { "Content-Type" => "application/json" }
        )
        response&.parsed_response["customers"][0]
      end
    end
  end
end
