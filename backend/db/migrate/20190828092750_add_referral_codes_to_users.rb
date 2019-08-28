class AddReferralCodesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :referral_code, :string
    add_column :users, :referred_by_code, :string
  end
end
