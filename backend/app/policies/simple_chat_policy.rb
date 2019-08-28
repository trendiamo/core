class SimpleChatPolicy < ApplicationPolicy
  def index?
    admin_or_account_member?
  end

  def create?
    admin_or_account_member?
  end

  def duplicate?
    admin_or_account_member?
  end

  def show?
    if admin_or_owner?
      true
    elsif editor?
      record.triggers.empty? && record.owner == user
    else
      false
    end
  end

  def update?
    if admin_or_owner?
      true
    elsif editor?
      record.triggers.empty? && record.owner == user
    else
      false
    end
  end

  def destroy?
    triggers_arrays = record.map { |record| record.triggers.pluck(:id) }
    if admin_or_owner?
      true
    elsif editor?
      triggers_arrays.flatten.empty? && record.distinct.pluck(:owner_id) == [user.id]
    else
      false
    end
  end
end
