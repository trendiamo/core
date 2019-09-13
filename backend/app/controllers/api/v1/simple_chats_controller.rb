module Api
  module V1
    class SimpleChatsController < RestAdminController
      before_action :ensure_tenant, unless: :current_user_is_seller?
      before_action :find_and_authorize_simple_chat, only: %i[show update duplicate submit reject]

      def index
        @simple_chats = policy_scope(SimpleChat).includes(:seller).all
        authorize @simple_chats
        chain = sorting(pagination(@simple_chats))
        render json: chain, skip_sections_attributes: true
      end

      def destroy
        @simple_chats = policy_scope(SimpleChat).where(id: params[:ids])
        authorize @simple_chats
        if @simple_chats.destroy_all
          render json: { data: @simple_chats }
        else
          render_error
        end
      end

      def create
        return render_image_error unless ConvertAndAssignSimpleChatImages.new(params).perform

        @simple_chat = SimpleChat.new(simple_chat_params)
        authorize @simple_chat
        @simple_chat.owner = current_user
        if @simple_chat.save
          render json: @simple_chat, status: :created
        else
          render_error
        end
      end

      def show
        ActsAsTenant.without_tenant do
          render json: @simple_chat
        end
      end

      def update
        return render_image_error unless ConvertAndAssignSimpleChatImages.new(params).perform

        if @simple_chat.update(simple_chat_params)
          render json: @simple_chat
        else
          render_error
        end
      end

      def duplicate
        @cloned_simple_chat = @simple_chat.deep_clone(include: { simple_chat_sections: :simple_chat_messages })
        @cloned_simple_chat.owner = current_user
        @cloned_simple_chat.account = nil if current_user_is_seller?
        @cloned_simple_chat.name = "Copied from - " + @cloned_simple_chat.name
        if @cloned_simple_chat.save
          render json: @cloned_simple_chat, status: :created
        else
          render_error
        end
      end

      def submit
        account_id = policy_scope(Brand).find(params[:simple_chat][:brand_id])&.account_id
        return render_submit_error unless account_id

        UpdateSimpleChatAccountId.new(@simple_chat, account_id).perform
        render json: @simple_chat
      end

      def reject
        UpdateSimpleChatAccountId.new(@simple_chat, nil).perform
        render json: @simple_chat
      end

      private

      def simple_chat_params # rubocop:disable Metrics/MethodLength
        result = params
                 .require(:simple_chat)
                 .permit(:id, :name, :heading, :teaser_message, :extra_teaser_message, :seller_id,
                         :use_seller_animation, :brand_id, :_destroy, :lock_version,
                         simple_chat_sections_attributes: [
                           :id, :key, :_destroy, :order, simple_chat_messages_attributes: [
                             :id, :order, :type, :html, :title, :img_id, :url, :display_price, :video_url,
                             :group_with_adjacent, :_destroy, img_rect: %i[x y width height],
                           ],
                         ])
        AddSimpleChatOrderFields.new(result).perform
      end

      def find_and_authorize_simple_chat
        @simple_chat = policy_scope(SimpleChat).find(params[:id])
        authorize @simple_chat
      end

      def render_image_error
        errors = [{ "title": "Image can't be blank" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_submit_error
        errors = [{ "title": "There was a problem submitting this chat" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @simple_chat.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
