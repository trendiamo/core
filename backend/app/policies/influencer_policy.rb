class InfluencerPolicy < ApplicationPolicy
  def index?
    user
  end

  def show?
    user
  end

  def create?
    user
  end

  def update?
    user
  end

  def destroy?
    user
  end
end
