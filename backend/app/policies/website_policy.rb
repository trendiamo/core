class WebsitePolicy < ApplicationPolicy
  def show?
    user
  end

  def create?
    user&.admin
  end

  def update?
    user
  end
end
