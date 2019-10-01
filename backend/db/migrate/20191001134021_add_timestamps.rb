class AddTimestamps < ActiveRecord::Migration[5.1]
  def change
    add_column :affiliations, :created_at, :datetime, null: false, default: "2019-10-01"
    add_column :affiliations, :updated_at, :datetime, null: false, default: "2019-10-01"
    add_column :brands, :created_at, :datetime, null: false, default: "2019-10-01"
    add_column :brands, :updated_at, :datetime, null: false, default: "2019-10-01"
    add_column :memberships, :created_at, :datetime, null: false, default: "2019-10-01"
    add_column :memberships, :updated_at, :datetime, null: false, default: "2019-10-01"
    add_column :products, :created_at, :datetime, null: false, default: "2019-10-01"
    add_column :products, :updated_at, :datetime, null: false, default: "2019-10-01"
  end
end
