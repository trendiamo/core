class AddAcceptedTermsAndConditionsAtToShops < ActiveRecord::Migration[5.2]
  def change
    add_column :shops, :accepted_terms_and_conditions_at, :datetime
  end
end
