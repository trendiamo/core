class CommentPolicy < ApplicationPolicy
  def permitted_attributes
    %i[content product_id]
  end

  def add_comment?
    user
  end

  def toggle_upvote?
    user
  end

  def flag?
    user
  end

  def toggle_pin_comment?
    user.id == record.product.user_id
  end

  def remove_comment?
    user.id == record.product.user_id
  end
end
