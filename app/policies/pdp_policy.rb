class PdpPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

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

  def permitted_attributes
    %i[title description start_at end_at]
  end
end
