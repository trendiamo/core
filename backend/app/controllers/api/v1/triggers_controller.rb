module Api
  module V1
    class TriggersController < RestAdminController
      before_action :ensure_tenant

      def index
        @triggers = policy_scope(Trigger).all.order(:order)
        authorize @triggers
        add_hostnames_header
        render json: @triggers
      end

      def create
        @trigger = Trigger.new(trigger_params)
        authorize @trigger
        if @trigger.save
          render json: @trigger, status: :created
        else
          render_error
        end
      end

      def show
        @trigger = policy_scope(Trigger).find(params[:id])
        authorize @trigger
        render json: @trigger
      end

      def update
        @trigger = policy_scope(Trigger).find(params[:id])
        authorize @trigger
        if @trigger.update(trigger_params)
          render json: @trigger
        else
          render_error
        end
      end

      def sort
        @triggers = policy_scope(Trigger).where(id: params[:ids])
        authorize @triggers
        if @triggers.all? { |trigger| trigger.update(order: params[:ids].index(trigger.id)) }
          render json: @triggers
        else
          render_error
        end
      end

      def destroy
        @triggers = policy_scope(Trigger).where(id: params[:ids])
        authorize @triggers
        if @triggers.destroy_all
          render json: { data: @triggers }
        else
          render_error
        end
      end

      private

      def trigger_params
        params.require(:trigger).permit(:flow_id, :flow_type, :lock_version, url_matchers: [])
      end

      def render_error
        errors = @trigger.errors.full_messages.map { |string| { title: string } }
        render json: { errors: errors }, status: :unprocessable_entity
      end

      def add_hostnames_header
        @hostnames = current_tenant.websites.first.hostnames
        response.headers["Hostnames"] = JSON.generate(@hostnames)
        response.headers["Access-Control-Expose-Headers"] = "Hostnames"
      end
    end
  end
end
