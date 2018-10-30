class Chat < ApplicationRecord
  has_many :first_chat_step, foreign_key: "chat_id", class_name: "ChatStep"

  validates :path, prescence: true
  validates :title, prescence: true
end
