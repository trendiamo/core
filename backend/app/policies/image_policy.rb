class ImagePolicy < ApplicationPolicy
  def index?
    admin_or_owner? || editor?
  end

  def create?
    admin_or_owner?
  end

  def destroy?
    admin_or_owner?
  end
end
