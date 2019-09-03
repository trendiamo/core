class MixpanelEventPolicy < ApplicationPolicy
  def index?
    user&.admin || user&.affiliate_role != "not_affiliate"
  end
end
