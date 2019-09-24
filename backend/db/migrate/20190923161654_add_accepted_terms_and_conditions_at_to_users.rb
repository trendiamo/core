class AddAcceptedTermsAndConditionsAtToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :accepted_terms_and_conditions_at, :datetime
  end
end
