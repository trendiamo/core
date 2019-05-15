class GeneratedUrlPolicy < ApplicationPolicy
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

  def create?
    !user&.editor? || user&.admin
  end
end
