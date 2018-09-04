class ShopifyAPI::ProductPolicy < ApplicationPolicy
  def delete_product?
    user
  end
end
