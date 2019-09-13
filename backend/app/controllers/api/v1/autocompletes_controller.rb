module Api
  module V1
    class AutocompletesController < RestAdminController
      before_action :authenticate_user!

      def sellers_autocomplete
        authorize :autocomplete
        @sellers = Seller.where("name ILIKE ?", "#{params[:searchQuery]}%")
        render json: @sellers
      end

      def flows_autocomplete
        authorize :autocomplete
        @flows = [SimpleChat, Outro, Showcase].map do |type|
          policy_scope(type).where("name ILIKE ?", "#{params[:searchQuery]}%")
        end.flatten
        render json: @flows, skip_sections_attributes: true
      end

      def path_autocomplete
        authorize :autocomplete
        @steps = [SimpleChat, Outro, Showcase].map do |type|
          policy_scope(type).where("name ILIKE ?", "#{params[:searchQuery]}%")
        end.flatten
        render json: @steps.map(&:paths).flatten
      end

      def brands_autocomplete
        authorize :autocomplete
        @brands = Brand.where(account_id: current_user.affiliations&.pluck(:account_id))
                       .where("name ILIKE ?", "#{params[:searchQuery]}%").order(:name)
        render json: @brands
      end
    end
  end
end
