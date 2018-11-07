class Conversation < ApplicationRecord
  belongs_to :account
  belongs_to :user
  has_many :messages, dependent: :destroy
end
