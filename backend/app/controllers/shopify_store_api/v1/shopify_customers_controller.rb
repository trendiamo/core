require "httparty"

module ShopifyStoreApi
  module V1
    class ShopifyCustomersController < RestController
      before_action :authenticate
      before_action :check_user_key

      def create
        return if params[:shopify_customer][:answers].empty?

        @shopify_customer = ShopifyCustomer.new(shopify_customer_params.merge({ email: @customer["email"] }))

        customer = {
          tags: %i[discounted-clients],
        }

        # Update a shopify customer
        # https://ENV['SHOPIFY_APP_KEY']:ENV['SHOPIFY_APP_PASSWORD']@hellodude23.myshopify.com/admin/api/2019-10/customers.json
        response = HTTParty.put("https://1d6b9da5416e702e7e63113fa9180427:21e62ab84440ecdc6fa05c9a0975b2de@hellodude23.myshopify.com/admin/api/2019-10/customers/#{@customer["id"]}.json",
              :body => { customer: customer }.to_json,
              :headers => {'Content-Type' => 'application/json'})

        if @shopify_customer.save
          render json: @shopify_customer, status: :created
        else
          render_error
        end
      end

      private

      def shopify_customer_params
        params
          .require(:shopify_customer).permit().tap do |whitelisted|
            whitelisted[:answers] = params[:shopify_customer][:answers].permit!
            whitelisted[:email] = @customer["email"]
          end
      end

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
    end
  end
end
