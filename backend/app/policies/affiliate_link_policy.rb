class AffiliateLinkPolicy < ApplicationPolicy
  def create?
    user && user.affiliate_role != "not_affiliate"
  end
end
