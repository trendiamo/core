class ImagePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if admin_or_account_member?
        scope
      else
        scope.where(account: nil, user: user).where.not(url: user.img_url)
      end
    end
  end

  def index?
    user
  end

  def create?
    record.account ? admin_or_account_member? : user
  end

  def destroy?
    admin_or_owner? || seller?
  end
end
