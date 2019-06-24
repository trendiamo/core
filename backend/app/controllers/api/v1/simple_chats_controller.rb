module Api
  module V1
    class SimpleChatsController < RestAdminController
      before_action :ensure_tenant

      def index
        @simple_chats = policy_scope(SimpleChat).includes(:persona).all
        authorize @simple_chats
        chain = sorting(pagination(@simple_chats))
        render json: chain
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
        return render_picture_error unless convert_and_assign_pictures

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
        @simple_chat = policy_scope(SimpleChat).find(params[:id])
        authorize @simple_chat
        render json: @simple_chat
      end

      def update
        return render_picture_error unless convert_and_assign_pictures

        @simple_chat = policy_scope(SimpleChat).find(params[:id])
        authorize @simple_chat
        if @simple_chat.update(simple_chat_params)
          render json: @simple_chat
        else
          render_error
        end
      end

      def duplicate
        @simple_chat = policy_scope(SimpleChat).find(params[:id])
        authorize @simple_chat
        @cloned_simple_chat = @simple_chat.deep_clone(include: { simple_chat_steps: :simple_chat_messages })
        @cloned_simple_chat.name = "Copied from - " + @cloned_simple_chat.name
        if @cloned_simple_chat.save
          render json: @cloned_simple_chat, status: :created
        else
          render_error
        end
      end

      private

      def simple_chat_params
        result = params.require(:simple_chat).permit(:id, :name, :title, :chat_bubble_text, :chat_bubble_extra_text,
                                                     :persona_id, :_destroy, :lock_version,
                                                     simple_chat_steps_attributes:
                                                     [:id, :key, :_destroy, :order, simple_chat_messages_attributes:
                                                    [:id, :order, :type, :text, :title, :pic_id, :url, :display_price,
                                                     :video_url, :group_with_adjacent, :_destroy,
                                                     pic_rect: %i[x y width height],],])

        add_order_fields(result[:simple_chat_steps_attributes])
        result
      end

      # add order fields to chat_step_attributes' messages and options, based on received order
      def add_order_fields(simple_chat_steps_attributes)
        return unless simple_chat_steps_attributes

        simple_chat_steps_attributes&.each_with_index do |chat_step_attributes, i|
          chat_step_attributes[:order] = i + 1
          next unless chat_step_attributes[:simple_chat_messages_attributes]

          chat_step_attributes[:simple_chat_messages_attributes]&.each_with_index do |chat_message_attributes, l|
            chat_message_attributes[:order] = l + 1
          end
        end
      end

      def convert_and_assign_pictures
        params[:simple_chat][:simple_chat_steps_attributes]&.each do |simple_chat_step_attributes|
          simple_chat_step_attributes[:simple_chat_messages_attributes]&.each do |simple_chat_message_attributes|
            pic_url = (simple_chat_message_attributes[:picture] && simple_chat_message_attributes[:picture][:url])
            unless pic_url.nil?
              return if pic_url.empty?

              simple_chat_message_attributes[:pic_id] = Picture.find_or_create_by!(url: pic_url).id
              simple_chat_message_attributes.delete(:pic_url)
            end
          end
        end
      end

      def render_picture_error
        errors = [{ "title": "Picture can't be blank" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @simple_chat.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
