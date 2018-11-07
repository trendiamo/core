class Message < ApplicationRecord
  belongs_to :account
  belongs_to :conversation
  belongs_to :user, optional: true

  validates :body, presence: true
  validate :user_or_visitor_ref_present

  private

  def user_or_visitor_ref_present
    errors.add(:base, "requires user or visitor_ref") unless user || visitor_ref
  end
end
