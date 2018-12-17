class ChangeShowOnboardingInUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :show_onboarding
    add_column :users, :onboarding_stage, :integer, default: 0
  end
end
