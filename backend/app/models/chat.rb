class Chat < ApplicationRecord
  has_many :first_chat_step, foreign_key: "chat_id", class_name: "ChatStep"
end
