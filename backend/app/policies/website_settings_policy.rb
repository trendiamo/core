class WebsiteSettingsPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin || user&.active_membership&.owner?
        scope
      else
        scope.none
      end
    end
  end

  def show?
    user&.admin || user&.active_membership&.owner?
  end

  def create?
    user&.admin
  end

  def update?
    user&.admin || user&.active_membership&.owner?
  end
end
