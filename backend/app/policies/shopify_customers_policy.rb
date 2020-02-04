class ShopifyCustomersPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user ? user.shopify_customers : scope.none
    end
  end

  def create?
    true
  end
end
