class WebsiteSettingsPolicy < ApplicationPolicy
  def show?
    admin_or_account_member?
  end

  def create?
    user&.admin
  end

  def update?
    admin_or_owner?
  end
end
