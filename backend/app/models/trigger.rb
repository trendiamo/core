class Trigger < ApplicationRecord
  acts_as_tenant

  belongs_to :flow, polymorphic: true

  validates :order, presence: true
  validates :name, presence: true
  validates :url_matchers, presence: true
  validate :url_matchers_cannot_be_blank

  def self.find_matching(pathname)
    Trigger.order(:order).find do |trigger|
      trigger.url_matchers.any? do |url_matcher|
        UrlMatcher.perform(pathname, url_matcher)
      end
    end
  end

  private

  def url_matchers_cannot_be_blank
    errors.add(:url_matchers, "can't be blank") if url_matchers.any?(&:blank?)
  end
end
