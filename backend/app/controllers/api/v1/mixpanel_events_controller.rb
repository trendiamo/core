module Api
  module V1
    class MixpanelEventsController < RestAdminController
      def index
        authorize :mixpanel_event
        result = ::Jql::RunQuery.new(jql_params, params[:chart]).perform
        if result.is_a?(RuntimeError)
          head :bad_request
        else
          render json: result
        end
      end

      private

      def jql_params
        current_tenant ? data_dashboard_params : revenues_params
      end

      def data_dashboard_params
        hostname = current_tenant.websites.first.hostnames.first
        { dates: JSON.parse(params.require(:dates)).with_indifferent_access, hostname: hostname, sort: params[:sort] }
      end

      def revenues_params
        token = current_user.affiliations.find_by(token: params.require(:affiliateToken))
        {
          dates: JSON.parse(params.require(:dates)).with_indifferent_access,
          affiliateToken: token,
          sort: params[:sort],
        }
      end
    end
  end
end
