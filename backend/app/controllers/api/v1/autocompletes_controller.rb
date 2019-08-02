module Api
  module V1
    class AutocompletesController < RestAdminController
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
        render json: @flows
      end

      def path_autocomplete
        authorize :autocomplete
        @steps = [SimpleChat, Outro, Showcase].map do |type|
          policy_scope(type).where("name ILIKE ?", "#{params[:searchQuery]}%")
        end.flatten
        render json: @steps.map(&:paths).flatten
      end
    end
  end
end
