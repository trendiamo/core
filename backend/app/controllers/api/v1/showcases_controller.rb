module Api
  module V1
    class ShowcasesController < RestAdminController
      before_action :ensure_tenant

      def index
        @showcases = policy_scope(Showcase).all
        authorize @showcases
        chain = sorting(pagination(@showcases))
        render json: chain
      end

      def create
        return render_image_error unless ConvertAndAssignShowcaseImages.new(params).perform

        @showcase = policy_scope(Showcase).new(showcase_params)
        authorize @showcase
        @showcase.owner = current_user
        if @showcase.save
          render json: @showcase, status: :created
        else
          render_error
        end
      end

      def show
        @showcase = policy_scope(Showcase).find(params[:id])
        authorize @showcase
        render json: @showcase
      end

      def update
        @showcase = policy_scope(Showcase).find(params[:id])
        authorize @showcase
        return render_image_error unless ConvertAndAssignShowcaseImages.new(params).perform

        if @showcase.update(showcase_params)
          render json: @showcase
        else
          render_error
        end
      end

      def destroy
        @showcases = policy_scope(Showcase).where(id: params[:ids])
        authorize @showcases
        if @showcases.destroy_all
          render json: { data: @showcases }
        else
          render_error
        end
      end

      def duplicate
        @showcase = policy_scope(Showcase).find(params[:id])
        authorize @showcase
        @cloned_showcase = @showcase.deep_clone(include: { spotlights: :product_picks })
        @cloned_showcase.owner = current_user
        @cloned_showcase.name = "Copied from - " + @cloned_showcase.name
        if @cloned_showcase.save
          render json: @cloned_showcase, status: :created
        else
          render_error
        end
      end

      private

      def showcase_params
        result = params.require(:showcase).permit(
          :name, :heading, :subheading, :teaser_message, :extra_teaser_message, :seller_id, :use_seller_animation,
          :lock_version, spotlights_attributes: [
            :id, :seller_id, :use_seller_animation, :_destroy,
            product_picks_attributes: [
              :id, :url, :name, :description, :display_price, :img_id, :_destroy, img_rect: %i[x y width height],
            ],
          ]
        )
        add_order_fields(result)
      end

      # add order fields to showcase_attributes' spotlights and product_picks, based on received order
      def add_order_fields(showcase_attrs)
        return unless showcase_attrs

        showcase_attrs[:spotlights_attributes]&.each_with_index do |spotlight_attrs, i|
          spotlight_attrs[:order] = i + 1
          spotlight_attrs[:product_picks_attributes]&.each_with_index do |product_pick_attrs, j|
            product_pick_attrs[:order] = j + 1
          end
        end
        showcase_attrs
      end

      def render_image_error
        errors = [{ "title": "Image can't be blank" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @showcase.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
