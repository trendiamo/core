class GeneratedUrlPolicy < ApplicationPolicy
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

  def create?
    user.active_membership&.owner? || user.admin
  end
end
