class LikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # def index?
  #   true # user
  # end

  # def show?
  #   true # user
  # end

  def create?
    true # user
  end

  # def update?
  #   true # user
  # end

  def destroy?
    true # user
  end

  def permitted_attributes
    %i[consumer_ref product_ref]
  end
end
