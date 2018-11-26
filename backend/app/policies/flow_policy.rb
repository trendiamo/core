class FlowPolicy < ApplicationPolicy
  def index?
    user
  end
end
