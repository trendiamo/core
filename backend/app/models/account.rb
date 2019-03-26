class Account < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :websites, dependent: :destroy
  has_many :personas, dependent: :destroy

  has_many :chat_steps, dependent: :destroy
  has_many :chat_messages, dependent: :destroy

  def as_json(_options = {})
    attributes.slice("id", "name", "last_name", "created_at", "updated_at")
              .merge(websites: websites)
  end
end
