class PersonaPolicy < ApplicationPolicy
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
    user.active_membership&.owner? || user.admin
  end

  def show?
    user.active_membership&.owner? || user.admin
  end

  def create?
    user.active_membership&.owner? || user.admin
  end

  def update?
    user.active_membership&.owner? || user.admin
  end

  def destroy?
    user.active_membership&.owner? || user.admin
  end
end
