class AddAnonymousLikesCountToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :anonymous_likes_count, :integer, null: false, default: 0
  end
end
