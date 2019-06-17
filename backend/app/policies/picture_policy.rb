class PicturePolicy < ApplicationPolicy
  def index?
    user.active_membership || user.admin
  end

  def create?
    user.active_membership&.owner? || user.admin
  end

  def destroy?
    user.active_membership&.owner? || user.admin
  end
end
