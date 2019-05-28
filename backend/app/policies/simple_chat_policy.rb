class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
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
    user && (!user.editor? || user.admin || record.triggers.empty?)
  end

  def create?
    user
  end

  def update?
    user && (!user.editor? || user.admin || record.triggers.empty?)
  end

  def destroy?
    triggers_arrays = record.map { |record| record.triggers.pluck(:id) }
    user && (!user.editor? || user.admin || triggers_arrays.flatten.empty?)
  end

  def duplicate?
    user
  end
end
