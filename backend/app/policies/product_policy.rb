class ProductPolicy < ApplicationPolicy
  def toggle_like?
    user
  end
end
