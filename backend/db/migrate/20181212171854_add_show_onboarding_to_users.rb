class AddShowOnboardingToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :show_onboarding, :boolean, default: :true
  end
end
