module Api
  module V1
    class CsrfController < RestAdminController
      skip_before_action :ensure_terms

      def csrf_token
        render json: { token: form_authenticity_token, logged_in: current_user.present? }
      end
    end
  end
end
