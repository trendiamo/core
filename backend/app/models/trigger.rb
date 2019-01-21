class Trigger < ApplicationRecord
  acts_as_tenant

  belongs_to :flow, polymorphic: true

  validates :order, presence: true
  validates :url_matchers, presence: true
  validate :url_matchers_cannot_be_blank

  before_create :assign_order

  def self.find_matching(pathname)
    Trigger.order(:order).find do |trigger|
      trigger.url_matchers.any? do |url_matcher|
        UrlMatcher.perform(pathname, url_matcher)
      end
    end
  end

  def as_json(_options = {})
    attributes
      .slice("id", "order", "url_matchers", "flow_id", "flow_type", "created_at", "updated_at")
      .merge(flow: { id: flow.id, name: flow.name })
  end

  def assign_order
    current_value = self.class.order(:order).pluck(:order).last || 0
    self.order = current_value + 1
  end

  private

  def url_matchers_cannot_be_blank
    errors.add(:url_matchers, "can't be blank") if url_matchers.any?(&:blank?)
  end
end
