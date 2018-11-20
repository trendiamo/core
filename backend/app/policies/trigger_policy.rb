class TriggerPolicy < ApplicationPolicy
  def index?
    user
  end
end
