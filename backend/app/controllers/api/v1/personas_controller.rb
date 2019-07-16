module Api
  module V1
    class PersonasController < RestAdminController
      before_action :ensure_tenant

      def index
        @personas = policy_scope(Persona).all
        authorize @personas
        chain = sorting(pagination(@personas))
        render json: chain
      end

      def show
        @persona = policy_scope(Persona).find(params[:id])
        authorize @persona
        render json: @persona
      end

      def update
        @persona = policy_scope(Persona).find(params[:id])
        authorize @persona
        convert_and_assign_pictures
        if @persona.update(persona_params)
          render json: @persona
        else
          render_error
        end
      end

      def create
        convert_and_assign_pictures
        @persona = Persona.new(persona_params)
        authorize @persona
        if @persona.save
          render json: @persona, status: :created
        else
          render_error
        end
      end

      def destroy
        @personas = policy_scope(Persona).where(id: params[:ids])
        authorize @personas
        if @personas.destroy_all
          render json: { data: @personas }
        else
          render_error
        end
      end

      private

      def persona_params
        params.require(:persona).permit(:name, :description, :instagram_url, :profile_pic_id,
                                        :profile_pic_animation_id, :lock_version, pic_rect: %i[x y width height])
      end

      def convert_and_assign_pictures
        %i[profile_pic profile_pic_animation].each do |pic|
          pic_url = params[:persona][pic][:url]
          params[:persona]["#{pic}_id"] = pic_url.present? ? Picture.find_or_create_by!(url: pic_url).id : nil
          params[:persona].delete("#{pic}_url")
        end
      end

      def render_error
        errors = @persona.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end
    end
  end
end
