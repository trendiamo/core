class WebsitePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
        scope.none
      else
        scope
      end
    end
  end

  def show?
    !user&.editor? || user&.admin
  end

  def create?
    user&.admin
  end

  def update?
    !user&.editor? || user&.admin
  end
end
