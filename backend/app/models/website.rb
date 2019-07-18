class Website < ApplicationRecord
  acts_as_tenant

  belongs_to :account
  has_many :website_settings, class_name: "WebsiteSettings", dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :hostnames, presence: true
  validate :hostnames_cannot_be_blank
  validate :hostnames_cannot_be_repeated

  accepts_nested_attributes_for :website_settings, allow_destroy: false

  before_validation :ensure_website_settings, on: :create

  def self.find_with_hostname(hostname)
    find_by("hostnames @> array[:hostname]::varchar[]", hostname: hostname)
  end

  private

  def hostnames_cannot_be_blank
    errors.add(:hostnames, "can't be blank") if hostnames.any?(&:blank?)
  end

  def hostnames_cannot_be_repeated
    other_hostnames = Website.unscoped.where.not(id: id).pluck(:hostnames).flatten
    return if ((hostnames || []) & other_hostnames).empty?

    errors.add(:hostnames, "already exists")
  end

  def ensure_website_settings
    return unless website_settings.length.zero?

    self.website_settings_attributes = [{ account: account }]
  end
end
