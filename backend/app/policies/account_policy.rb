class AccountPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin
        scope.all
      else
        user ? user.accounts : scope.none
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
    user&.admin
  end

  def destroy?
    user&.admin
  end
end
