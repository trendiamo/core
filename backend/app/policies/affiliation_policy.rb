class AffiliationPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user ? user.affiliations : scope.none
    end
  end

  def index?
    true
  end

  def create?
    user && user.affiliate_role != "not_affiliate"
  end
end
