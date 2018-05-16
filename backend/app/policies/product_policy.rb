class ProductPolicy < ApplicationPolicy
  def toggle_like?
    true
  end
end
