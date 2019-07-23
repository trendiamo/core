class TriggerPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin || user&.active_membership&.owner?
        scope
      else
        scope.none
      end
    end
  end

  def index?
    user&.admin || user&.active_membership&.owner?
  end

  def show?
    user&.admin || user&.active_membership&.owner?
  end

  def create?
    user&.admin || user&.active_membership&.owner?
  end

  def update?
    user&.admin || user&.active_membership&.owner?
  end

  def sort?
    user&.admin || user&.active_membership&.owner?
  end

  def destroy?
    user&.admin || user&.active_membership&.owner?
  end
end
