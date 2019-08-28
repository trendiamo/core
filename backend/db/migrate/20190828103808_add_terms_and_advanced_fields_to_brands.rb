class AddTermsAndAdvancedFieldsToBrands < ActiveRecord::Migration[5.1]
  def change
    add_column :brands, :full_description, :text
    add_column :brands, :terms_and_conditions, :text
    add_column :brands, :commission_description, :string
    add_column :brands, :commission_value, :string
    add_column :brands, :header_image_url, :string
    add_column :brands, :instagram_url, :string
    add_column :brands, :facebook_url, :string
    add_column :brands, :twitter_url, :string
  end
end
