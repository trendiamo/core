module Api
  module V1
    class OrdersController < RestAdminController
      before_action :authenticate_user!

      def index
        @orders = current_user.orders.where(captured_at: params[:from_date]..params[:to_date])
        authorize @orders
        render json: @orders
      end

      def revenues
        @orders = current_user.orders.where(captured_at: params[:from_date]..params[:to_date])
        authorize @orders
        render json: calculate_revenues
      end

      private

      def calculate_revenues
        @orders.group_by(&:account_id).map do |account_id, orders|
          totals = []
          orders.group_by(&:currency).map do |currency, orders_by_currency|
            totals << {
              currency: currency,
              value: orders_by_currency.sum { |order| order.amount_in_cents * order.commission_rate.to_f },
            }
          end
          { brand_attributes: brand_attributes(account_id), totals: totals }
        end
      end

      def brand_attributes(account_id)
        brand = Account.find(account_id).brand
        {
          name: brand.name,
          description: brand.description,
          logo_url: brand.logo_url,
        }
      end
    end
  end
end
