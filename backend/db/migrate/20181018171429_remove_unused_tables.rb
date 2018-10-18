class RemoveUnusedTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :brands, force: :cascade
    drop_table :collection_modals, force: :cascade
    drop_table :collections, force: :cascade
    drop_table :comments, force: :cascade
    drop_table :fenced_collections, force: :cascade
    drop_table :inappropriate_flags, force: :cascade
    drop_table :likes, force: :cascade
    drop_table :products, force: :cascade
    drop_table :upvotes, force: :cascade
    drop_table :videos, force: :cascade
  end
end
