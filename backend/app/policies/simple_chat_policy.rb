class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      admin_or_account_member? ? scope : scope.where(owner: user)
    end
  end

  def index?
    admin_or_account_member? || seller?
  end

  def create?
    admin_or_account_member? || seller?
  end

  def duplicate?
    admin_or_account_member? || seller?
  end

  def show?
    if admin_or_account_member?
      true
    elsif seller?
      record.triggers.empty? && !record.account
    else
      false
    end
  end

  def update? # rubocop:disable Metrics/AbcSize
    if admin_or_owner?
      true
    elsif seller?
      record.triggers.empty? && !record.account
    elsif editor?
      record.triggers.empty? && record.owner == user
    else
      false
    end
  end

  def destroy?
    if admin_or_owner?
      record.all? { |chat| chat.owner.affiliate_role == "not_affiliate" }
    elsif editor?
      owner_and_inactive_chat?
    elsif seller?
      owner_and_inactive_chat? && record.none?(&:account_id)
    else
      false
    end
  end

  def submit?
    seller?
  end

  def reject?
    admin_or_owner? && record.triggers.empty?
  end

  private

  def owner_and_inactive_chat?
    triggers_arrays = record.map { |record| record.triggers.pluck(:id) }
    triggers_arrays.flatten.empty? && record.distinct.pluck(:owner_id) == [user.id]
  end
end
