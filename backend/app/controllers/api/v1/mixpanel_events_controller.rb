module Api
  module V1
    class MixpanelEventsController < RestAdminController
      def index
        authorize :mixpanel_event
        render json: Mixpanel::RunQuery.new(stringified_jql_params, Mixpanel::Scripts.conversion_rate).perform
      end

      private

      def jql_params
        params.require(:dates).permit(:from_date, :to_date).to_h
      end

      def stringified_jql_params
        hostname = current_tenant.websites.first.hostnames.first
        { "dates": jql_params, "hostname": hostname }.to_json.to_s
      end
    end
  end
end
