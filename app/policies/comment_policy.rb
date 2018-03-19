class CommentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def index?
    user
  end

  def create?
    user
  end

  def permitted_attributes
    %i[text]
  end
end
