class AccountPolicy < ApplicationPolicy
  def index?
    user&.admin
  end

  def create?
    user&.admin
  end
end
