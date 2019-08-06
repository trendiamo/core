module Api
  module V1
    class OutrosController < RestAdminController
      before_action :ensure_tenant

      def index
        @outros = policy_scope(Outro).includes(:seller).all
        authorize @outros
        chain = sorting(pagination(@outros))
        render json: chain
      end

      def create
        @outro = Outro.new(outro_params)
        authorize @outro
        @outro.owner = current_user
        if @outro.save
          render json: @outro, status: :created
        else
          render_error
        end
      end

      def show
        @outro = policy_scope(Outro).find(params[:id])
        authorize @outro
        render json: @outro
      end

      def update
        @outro = policy_scope(Outro).find(params[:id])
        authorize @outro
        if @outro.update(outro_params)
          render json: @outro
        else
          render_error
        end
      end

      def destroy
        @outros = policy_scope(Outro).where(id: params[:ids])
        authorize @outros
        if @outros.destroy_all
          render json: { data: @outros }
        else
          render_error
        end
      end

      def duplicate
        @outro = policy_scope(Outro).find(params[:id])
        authorize @outro
        @cloned_outro = @outro.deep_clone
        @cloned_outro.owner = current_user
        @cloned_outro.name = "Copied from - " + @cloned_outro.name
        if @cloned_outro.save
          render json: @cloned_outro, status: :created
        else
          render_error
        end
      end

      private

      def outro_params
        params
          .require(:outro)
          .permit(:seller_id, :name, :teaser_message, :chat_bubble_button_no, :chat_bubble_button_yes, :lock_version,
                  :use_seller_animation)
          .reverse_merge(outro_compat_params)
      end

      def outro_compat_params
        { teaser_message: params.require(:outro)[:chat_bubble_text] }
      end

      def render_error
        errors = @outro.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
