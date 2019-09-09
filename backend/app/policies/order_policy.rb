class OrderPolicy < ApplicationPolicy
  def index?
    user
  end

  def revenues?
    user
  end
end
