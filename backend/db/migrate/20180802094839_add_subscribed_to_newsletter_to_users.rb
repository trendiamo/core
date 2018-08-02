class AddSubscribedToNewsletterToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :subscribed_to_newsletter, :boolean, default: false, null: false
  end
end
