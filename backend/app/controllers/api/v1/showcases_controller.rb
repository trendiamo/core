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
        return render_picture_error unless convert_and_assign_pictures

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
        return render_picture_error unless convert_and_assign_pictures

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
          :name, :title, :subtitle, :chat_bubble_text, :chat_bubble_extra_text, :persona_id, :lock_version,
          spotlights_attributes: [
            :id, :persona_id, :_destroy,
            product_picks_attributes: [
              :id, :url, :name, :description, :display_price, :pic_id, :_destroy, pic_rect: %i[x y width height],
            ],
          ]
        )
        add_order_fields(result)
      end

      def convert_and_assign_pictures
        params[:showcase][:spotlights_attributes]&.each do |spotlight_attributes|
          spotlight_attributes[:product_picks_attributes]&.each do |product_pick_attributes|
            pic_url = (product_pick_attributes[:picture] && product_pick_attributes[:picture][:url])
            return if pic_url.empty?

            product_pick_attributes[:pic_id] = Picture.find_or_create_by!(url: pic_url).id
            product_pick_attributes.delete(:pic_url)
          end
        end
      end

      # add order fields to showcase_attributes' spotlights and product_picks, based on received order
      def add_order_fields(showcase_attributes)
        return unless showcase_attributes

        showcase_attributes[:spotlights_attributes]&.each_with_index do |spotlight_attributes, i|
          spotlight_attributes[:order] = i + 1
          spotlight_attributes[:product_picks_attributes]&.each_with_index do |product_pick_attributes, j|
            product_pick_attributes[:order] = j + 1
          end
        end
        showcase_attributes
      end

      def render_picture_error
        errors = [{ "title": "Picture can't be blank" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @showcase.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
