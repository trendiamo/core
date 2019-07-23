class UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if admin_or_owner?
        scope
      else
        scope.none
      end
    end
  end

  def index?
    admin_or_owner?
  end

  def create?
    user&.admin
  end

  def destroy?
    user&.admin
  end
end
