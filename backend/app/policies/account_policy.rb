class AccountPolicy < ApplicationPolicy
  def index?
    user&.admin
  end
end
