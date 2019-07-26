module Api
  module V1
    class MixpanelEventsController < RestAdminController
      def index
        authorize :mixpanel_event
        result = ::Mixpanel::RunQuery.new(jql_params, params[:chart]).perform
        if result.is_a?(RuntimeError)
          head :bad_request
        else
          render json: result
        end
      end

      private

      def jql_params
        hostname = current_tenant.websites.first.hostnames.first
        { dates: JSON.parse(params[:dates]).with_indifferent_access, hostname: hostname, sort: params[:sort] }
      end
    end
  end
end
