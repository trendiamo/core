class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.active_membership&.editor?
        scope.none
      else
        scope
      end
    end
  end

  def index?
    user.active_membership && !user.active_membership&.editor?
  end

  def create?
    user&.admin
  end

  def destroy?
    user&.admin
  end
end
