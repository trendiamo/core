class SpotlightPolicy < ApplicationPolicy
  def sort?
    user
  end
end
