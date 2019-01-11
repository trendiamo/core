class ProductPickPolicy < ApplicationPolicy
  def sort?
    user
  end
end
