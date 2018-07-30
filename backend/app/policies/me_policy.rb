class MePolicy < ApplicationPolicy
  def me?
    user
  end
end
