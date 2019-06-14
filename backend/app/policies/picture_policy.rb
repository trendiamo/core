class PicturePolicy < ApplicationPolicy
  def index?
    user
  end

  def create?
    user.active_membership && !user.active_membership&.editor?
  end

  def destroy?
    user.active_membership && !user.active_membership&.editor?
  end
end
