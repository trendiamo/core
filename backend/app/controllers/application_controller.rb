class ApplicationController < ActionController::API
  include Pundit
  set_current_tenant_through_filter
  before_action :current_tenant

  def current_tenant
    set_current_tenant(current_user.account) if current_user
  end
end
