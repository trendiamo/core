class SimpleChatPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.editor? && !user&.admin
        scope.where(owner: user).includes(:triggers).where(triggers: { id: nil })
      else
        scope
      end
    end
  end

  def index?
    user
  end

  def show?
    user
  end

  def create?
    user
  end

  def update?
    user && (user.admin? || user.owner? || editor_owner_of_record?)
  end

  def destroy?
    user && (user.admin? || user.owner? || editor_owner_of_record?)
  end

  def duplicate?
    user && (user.admin? || user.owner? || editor_owner_of_record?)
  end

  def editor_owner_of_record?
    user.editor? && owner_of_record?
  end

  def owner_of_record?
    # destroy record is an activerecord::relation not SimpleChat
    return record&.owner_id == user.id if record&.is_a?(SimpleChat)

    record.all? { |item| item.owner_id == user.id }
  end
end
