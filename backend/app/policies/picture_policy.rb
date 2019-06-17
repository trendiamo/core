class PicturePolicy < ApplicationPolicy
  def index?
    user
  end

  def create?
    user.active_membership&.owner? || user.admin
  end

  def destroy?
    user.active_membership&.owner? || user.admin
  end
end
