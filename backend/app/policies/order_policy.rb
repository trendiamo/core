class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(seller: user)
    end
  end

  def index?
    user
  end

  def revenues?
    user
  end
end
