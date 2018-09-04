class NilPolicy < ApplicationPolicy
  def delete_products?
    user
  end

  def shopify_collection?
    user
  end
end
