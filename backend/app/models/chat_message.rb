class ChatMessage < ApplicationRecord
  acts_as_tenant
  belongs_to :chat_step

  validates :text, presence: true

  def as_json(_options = {})
    attributes
      .slice("id", "delay", "text", "created_at", "updated_at")
  end
end
