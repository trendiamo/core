class PicturePolicy < ApplicationPolicy
  def index?
    user&.admin || user&.active_membership
  end

  def create?
    user&.admin || user&.active_membership&.owner?
  end

  def destroy?
    user&.admin || user&.active_membership&.owner?
  end
end
