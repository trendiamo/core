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
        return render_image_error unless convert_and_assign_images

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
        return render_image_error unless convert_and_assign_images

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
        convert_simple_chat_params
        result = params.require(:simple_chat).permit(
          :id, :name, :heading, :teaser_message, :extra_teaser_message, :seller_id, :use_seller_animation, :_destroy,
          :lock_version, simple_chat_sections_attributes: [
            :id, :key, :_destroy, :order, simple_chat_messages_attributes: [
              :id, :order, :type, :html, :title, :img_id, :url, :display_price, :video_url, :group_with_adjacent,
              :_destroy, img_rect: %i[x y width height],
            ],
          ]
        )
        add_order_fields(result)
      end

      def convert_simple_chat_params
        params[:simple_chat][:simple_chat_sections_attributes]&.each do |scs_a|
          scs_a[:simple_chat_messages_attributes]&.each do |scm_a|
            scm_a[:img_id] = scm_a[:pic_id] if scm_a[:pic_id]
            scm_a[:img_rect] = scm_a[:pic_rect] if scm_a[:pic_rect]
          end
        end
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

      def convert_and_assign_images # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
        params[:simple_chat][:simple_chat_sections_attributes]&.each do |scs_a|
          scs_a[:simple_chat_messages_attributes]&.each do |scm_a|
            scm_a[:img] = scm_a[:picture] if scm_a[:picture]
            img_url = (scm_a[:img] && scm_a[:img][:url])
            unless img_url.nil?
              return if img_url.empty?

              scm_a[:img_id] = Image.find_or_create_by!(url: img_url).id
              scm_a.delete(:img_url)
              scm_a.delete(:pic_url)
            end
          end
        end
      end

      def render_image_error
        errors = [{ "title": "Image can't be blank" }]
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def render_error
        errors = @simple_chat.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
