class ImagePolicy < ApplicationPolicy
  def index?
    admin_or_account_member?
  end

  def create?
    record.account ? admin_or_account_member? : user
  end

  def destroy?
    admin_or_owner?
  end
end
