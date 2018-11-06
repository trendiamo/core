class Website < ApplicationRecord
  acts_as_tenant

  belongs_to :account

  validates :name, presence: true, uniqueness: true
  validates :title, presence: true
  validates :hostnames, presence: true
  validate :hostnames_cannot_be_blank
  validate :hostnames_cannot_be_repeated

  def self.find_by_hostname(hostname)
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
end
