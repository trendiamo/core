class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.active_membership&.editor?
        scope.where(owner: user)
      else
        scope
      end
    end
  end

  def index?
    user
  end

  def show?
    user && (user.active_membership&.owner? || user.admin || record.triggers.empty?)
  end

  def create?
    user.active_membership
  end

  def update?
    user && (user.active_membership&.owner? || user.admin || record.triggers.empty?)
  end

  def destroy?
    triggers_arrays = record.map { |record| record.triggers.pluck(:id) }
    user && (user.active_membership&.owner? || user.admin || triggers_arrays.flatten.empty?)
  end

  def duplicate?
    user
  end
end
