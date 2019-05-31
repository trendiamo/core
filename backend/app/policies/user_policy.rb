class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
        scope.none
      else
        scope
      end
    end
  end

  def index?
    !user&.editor? || user&.admin
  end

  def create?
    user&.admin
  end

  def destroy?
    user&.admin
  end
end
