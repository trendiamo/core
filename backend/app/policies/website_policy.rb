class WebsitePolicy < ApplicationPolicy
  def show?
    user
  end

  def update?
    user
  end
end
