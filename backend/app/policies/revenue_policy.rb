class RevenuePolicy < ApplicationPolicy
  def index?
    user
  end
end
