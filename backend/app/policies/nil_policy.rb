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

  def expositions_connection?
    user
  end

  def create_exposition?
    user
  end

  def delete_exposition?
    user
  end

  def website?
    user
  end

  def websites?
    user
  end

  def websites_connection?
    user
  end

  def hostname?
    user
  end

  def hostnames?
    user
  end

  def hostnames_connection?
    user
  end

  def create_hostname?
    user
  end
end
