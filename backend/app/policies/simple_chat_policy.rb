class SimpleChatPolicy < ApplicationPolicy
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

  def duplicate?
    user
  end
end
