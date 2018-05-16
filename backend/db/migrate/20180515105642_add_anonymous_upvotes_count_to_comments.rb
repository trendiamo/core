class AddAnonymousUpvotesCountToComments < ActiveRecord::Migration[5.1]
  def change
    add_column :comments, :anonymous_upvotes_count, :integer, null: false, default: 0
  end
end
