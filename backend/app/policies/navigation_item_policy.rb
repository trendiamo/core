class NavigationItemPolicy < ApplicationPolicy
  def sort?
    user
  end
end
