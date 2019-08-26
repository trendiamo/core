class WebsiteSettingsPolicy < ApplicationPolicy
  def show?
    user
  end

  def create?
    user&.admin
  end

  def update?
    admin_or_owner?
  end
end
