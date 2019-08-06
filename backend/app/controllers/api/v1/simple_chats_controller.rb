module Api
  module V1
    class SimpleChatsController < RestAdminController # rubocop:disable Metrics/ClassLength
      before_action :ensure_tenant

      def index
        @simple_chats = policy_scope(SimpleChat).includes(:seller).all
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
        @cloned_simple_chat = @simple_chat.deep_clone(include: { simple_chat_sections: :simple_chat_messages })
        @cloned_simple_chat.owner = current_user
        @cloned_simple_chat.name = "Copied from - " + @cloned_simple_chat.name
        if @cloned_simple_chat.save
          render json: @cloned_simple_chat, status: :created
        else
          render_error
        end
      end

      private

      def simple_chat_params # rubocop:disable Metrics/MethodLength
        result = params
                 .require(:simple_chat)
                 .permit(:id, :name, :heading, :teaser_message, :extra_teaser_message, :seller_id,
                         :use_seller_animation, :_destroy, :lock_version,
                         simple_chat_sections_attributes: [
                           :id, :key, :_destroy, :order, simple_chat_messages_attributes: [
                             :id, :order, :type, :html, :title, :pic_id, :url, :display_price, :video_url,
                             :group_with_adjacent, :_destroy, pic_rect: %i[x y width height],
                           ],
                         ])
        add_order_fields(result)
      end

      # add order fields to chat_section_attributes' messages and options, based on received order
      def add_order_fields(chat_attrs)
        chat_sections_attrs = chat_attrs[:simple_chat_sections_attributes]
        return unless chat_sections_attrs

        chat_sections_attrs&.each_with_index do |chat_section_attrs, i|
          chat_section_attrs[:order] = i + 1
          next unless chat_section_attrs[:simple_chat_messages_attributes]

          chat_section_attrs[:simple_chat_messages_attributes]&.each_with_index do |chat_message_attrs, l|
            chat_message_attrs[:order] = l + 1
          end
        end
        chat_attrs
      end

      def convert_and_assign_pictures
        params[:simple_chat][:simple_chat_sections_attributes]&.each do |simple_chat_section_attributes|
          simple_chat_section_attributes[:simple_chat_messages_attributes]&.each do |simple_chat_message_attributes|
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
