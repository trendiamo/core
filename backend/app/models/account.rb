class Account < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :websites, dependent: :destroy
  has_many :personas, dependent: :destroy
  has_many :pictures, dependent: :destroy

  has_many :simple_chat_steps, dependent: :destroy
  has_many :simple_chat_messages, dependent: :destroy

  accepts_nested_attributes_for :websites, allow_destroy: true

  def as_json(_options = {})
    attributes.slice("id", "name", "last_name", "created_at", "updated_at")
              .merge(websites_attributes: websites)
  end

  def duplicate(name, hostnames)
    duplicate_account = DuplicateAccount.new(self, name, hostnames)
    duplicate_account.perform
  end
end
