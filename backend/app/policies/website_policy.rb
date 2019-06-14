class WebsitePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.active_membership&.editor?
        scope.none
      else
        scope
      end
    end
  end

  def show?
    user.active_membership && !user.active_membership&.editor?
  end

  def create?
    user&.admin
  end

  def update?
    user.active_membership && !user.active_membership&.editor?
  end
end
