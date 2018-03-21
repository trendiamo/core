class ProductPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  # graphql queries:
  def toggle_like?
    user
  end
end
