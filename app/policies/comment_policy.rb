class CommentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end

  def permitted_attributes
    %i[content product_ref]
  end

  # REST actions:
  def index?
    user
  end

  def create?
    user
  end

  # graphql queries:
  def add_comment?
    user
  end

  def toggle_upvote?
    user
  end

  def flag?
    user
  end
end
