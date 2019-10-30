class TagPolicy < ApplicationPolicy
  def index?
    user && user.affiliate_role != "not_affiliate"
  end
end
