module Api
  module V1
    class MixpanelEventsController < RestAdminController
      def index
        authorize :mixpanel_event
        render json: Mixpanel::RunQuery.new(jql_params, Mixpanel::Scripts.conversion_rate).perform
      end

      private

      def jql_params
        hostname = current_tenant.websites.first.hostnames.first
        { dates: dates_params.to_h, hostname: hostname }.to_json
      end

      def dates_params
        params.require(:dates).permit(:from_date, :to_date)
      end
    end
  end
end
