class ImagePolicy < ApplicationPolicy
  def index?
    user&.admin || user&.active_membership
  end

  def create?
    admin_or_owner?
  end

  def destroy?
    admin_or_owner?
  end
end
