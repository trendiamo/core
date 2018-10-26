class ApplicationController < ActionController::API
  include Pundit
  set_current_tenant_through_filter
  before_action :current_tenant

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def current_tenant
    set_current_tenant(current_user.account) if current_user
  end

  def user_not_authorized
    errors = [{ title: "You are not authorized to perform this action." }]
    render json: { errors: errors }, status: :forbidden
  end
end
