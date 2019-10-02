class RemoveTimestampsDefaultValue < ActiveRecord::Migration[5.1]
  def change
    change_column_default(:affiliations, :created_at, from: "2019-10-01", to: nil)
    change_column_default(:affiliations, :updated_at, from: "2019-10-01", to: nil)
    change_column_default(:brands, :created_at, from: "2019-10-01", to: nil)
    change_column_default(:brands, :updated_at, from: "2019-10-01", to: nil)
    change_column_default(:memberships, :created_at, from: "2019-10-01", to: nil)
    change_column_default(:memberships, :updated_at, from: "2019-10-01", to: nil)
    change_column_default(:products, :created_at, from: "2019-10-01", to: nil)
    change_column_default(:products, :updated_at, from: "2019-10-01", to: nil)
  end
end
