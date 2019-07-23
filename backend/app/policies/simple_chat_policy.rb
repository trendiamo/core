class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin || user&.active_membership&.owner?
        scope
      else
        scope.where(owner: user)
      end
    end
  end

  def index?
    user&.admin || user&.active_membership
  end

  def show?
    user && (user&.admin || user&.active_membership&.owner? || record.triggers.empty?)
  end

  def create?
    user&.admin || user&.active_membership
  end

  def update?
    user && (user&.admin || user&.active_membership&.owner? || record.triggers.empty?)
  end

  def destroy?
    triggers_arrays = record.map { |record| record.triggers.pluck(:id) }
    user && (user&.admin || user&.active_membership&.owner? || triggers_arrays.flatten.empty?)
  end

  def duplicate?
    user&.admin || user&.active_membership
  end
end
