class ApplicationPolicy
  attr_reader :user, :record

  def initialize(user, record)
    @user = user
    @record = record
  end

  def scope
    Pundit.policy_scope!(user, record.class)
  end

  def admin_or_owner?
    user&.admin || user&.active_membership&.owner?
  end

  def admin_or_account_member?
    user&.admin || user&.active_membership
  end

  def editor?
    user&.active_membership&.editor?
  end

  def seller?
    user&.affiliate_role == "seller"
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope
    end

    def admin_or_owner?
      user&.admin || user&.active_membership&.owner?
    end

    def admin_or_account_member?
      user&.admin || user&.active_membership
    end

    def editor?
      user&.active_membership&.editor?
    end

    def seller?
      user&.affiliate_role == "seller"
    end
  end
end
