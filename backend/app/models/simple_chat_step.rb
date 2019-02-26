class SimpleChatStep < ApplicationRecord
  acts_as_tenant
  belongs_to :simple_chat
  has_many :simple_chat_messages, dependent: :destroy

  accepts_nested_attributes_for :simple_chat_messages, allow_destroy: true

  before_create :assign_order

  validate :dafault_cannot_be_repeated

  def as_json(_options = {})
    {
      id: id,
      key: key,
      simple_chat_messages_attributes: simple_chat_messages.order(:order).map(&:as_json),
    }
  end

  def assign_order
    current_value = self.class.where(simple_chat_id: simple_chat_id).order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end

  private

  def dafault_cannot_be_repeated
    return if key != "default"
    other_default_keys = self.class.where(simple_chat_id: simple_chat_id, key: "default").pluck(:id)
    return if other_default_keys.empty? || (other_default_keys.include? id)
    errors.add(:key, "default already exists")
  end
end
