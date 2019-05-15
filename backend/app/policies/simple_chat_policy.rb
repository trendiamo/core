class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
        scope.where(owner: user).includes(:triggers).where(triggers: { id: nil })
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
    user
  end

  def update?
    user
  end

  def destroy?
    user
  end

  def duplicate?
    user
  end
end
