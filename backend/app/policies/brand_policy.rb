class BrandPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.includes(:account).where(accounts: { is_affiliate: true })
    end
  end

  def index?
    user
  end

  def show?
    user
  end
end
