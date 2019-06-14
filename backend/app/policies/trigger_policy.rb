class TriggerPolicy < ApplicationPolicy
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
    user
  end

  def show?
    user
  end

  def create?
    user.active_membership && !user.active_membership&.editor?
  end

  def update?
    user.active_membership && !user.active_membership&.editor?
  end

  def sort?
    user
  end

  def destroy?
    user.active_membership && !user.active_membership&.editor?
  end
end
