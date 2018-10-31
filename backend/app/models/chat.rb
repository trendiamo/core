class Chat < ApplicationRecord
  has_one :first_chat_step, foreign_key: "chat_id", class_name: "ChatStep"

  validates :path, presence: true
  validates :title, presence: true
end
