class RestController < ApplicationController
  include ActionController::Cookies
  include Pundit
  set_current_tenant_through_filter
  include ActionController::RequestForgeryProtection
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def ensure_tenant
    render json: { errors: [{ title: "Tenant must be set" }] }, status: :forbidden unless current_tenant
  end

  def user_not_authorized
    errors = [{ title: "You are not authorized to perform this action." }]
    render json: { errors: errors }, status: :forbidden
  end
end
