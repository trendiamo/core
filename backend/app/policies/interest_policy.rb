class InterestPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user ? user.interests : scope.none
    end
  end

  def index?
    true
  end

  def create?
    user && user.affiliate_role != "not_affiliate"
  end

  def destroy?
    user && user.affiliate_role != "not_affiliate"
  end
end
