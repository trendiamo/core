class CommentPolicy < ApplicationPolicy
  def permitted_attributes
    %i[content product_id]
  end

  def add_comment?
    true
  end

  def toggle_upvote?
    true
  end

  def flag?
    true
  end

  def toggle_pin_comment?
    user.id == record.product.user_id
  end

  def remove_comment?
    user.id == record.product.user_id
  end
end
