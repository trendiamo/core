class NilPolicy < ApplicationPolicy
  def delete_products?
    user
  end

  def shopify_collection?
    user
  end

  def exposition?
    user
  end

  def expositions?
    user
  end

  def create_exposition?
    user
  end

  def delete_exposition?
    user
  end
end
