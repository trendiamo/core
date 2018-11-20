class Trigger < ApplicationRecord
  acts_as_tenant

  belongs_to :flow, polymorphic: true

  validates :order, presence: true
  validates :url_matchers, presence: true
  validate :url_matchers_cannot_be_blank

  private

  def url_matchers_cannot_be_blank
    errors.add(:url_matchers, "can't be blank") if url_matchers.any?(&:blank?)
  end
end
