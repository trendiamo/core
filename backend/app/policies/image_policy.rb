class ImagePolicy < ApplicationPolicy
  def index?
    admin_or_account_member?
  end

  def create?
    admin_or_account_member?
  end

  def destroy?
    admin_or_owner?
  end
end
