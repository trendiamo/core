module ShopApi
  module V1
    class OrdersController < RestController
      before_action :set_tenant_from_hostname
      before_action :ensure_tenant
      before_action :authenticate
      before_action :set_affiliation

      def create
        @order = Order.new(order_params)
        if @order.save
          render json: @order, status: :created
        else
          render_error
        end
      end

      private

      def order_params
        result = params.require(:order).permit(:source_id, :source, :amount_in_cents, :currency, :payload,
                                               products: %i[id quantity name price currency])
        result = result.merge(payload: params[:order][:payload].permit!.to_h)
        result.merge(extra_params)
      end

      def extra_params
        {
          account_id: @affiliation&.account_id,
          seller_id: @affiliation&.user_id,
          captured_at: Time.now.utc,
          commission_rate: @affiliation && @affiliation.account.brand.commission_rate,
        }
      end

      def render_error
        errors = @order.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def authenticate
        auth_header = request.headers["Authorization"]
        return if auth_header == "Plain #{ENV['SHOP_API_TOKEN']}"

        user_not_authorized
      end

      def set_tenant_from_hostname
        hostname_header = request.headers["Hostname"]
        set_current_tenant(Website.find_with_hostname(hostname_header)&.account)
      end

      def set_affiliation
        affiliate_token = params[:order][:affiliate_token]
        return unless affiliate_token

        @affiliation = Affiliation.find_by(token: affiliate_token)
      end
    end
  end
end
