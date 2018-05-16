class ChangeCommentOnInappropriateFlags < ActiveRecord::Migration[5.1]
  def change
    change_column_null :inappropriate_flags, :comment_id, false
  end
end
