class MixpanelEventPolicy < ApplicationPolicy
  def index?
    user&.admin
  end
end
