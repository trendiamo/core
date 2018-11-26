class CurationPolicy < ApplicationPolicy
  def index?
    user
  end

  def destroy?
    user
  end
end
