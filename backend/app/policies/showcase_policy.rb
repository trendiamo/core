class ShowcasePolicy < ApplicationPolicy
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
    user
  end

  def show?
    user
  end

  def create?
    !user&.editor? || user&.admin
  end

  def update?
    !user&.editor? || user&.admin
  end

  def destroy?
    !user&.editor? || user&.admin
  end

  def duplicate?
    !user&.editor? || user&.admin
  end
end
