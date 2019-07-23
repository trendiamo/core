class WebsitePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if admin_or_owner?
        scope
      else
        scope.none
      end
    end
  end

  def show?
    admin_or_owner?
  end

  def create?
    user&.admin
  end

  def update?
    admin_or_owner?
  end
end
