class Website < ApplicationRecord
  acts_as_tenant

  belongs_to :account

  validates :name, presence: true, uniqueness: true
  validates :title, presence: true
  validates :hostnames, presence: true

  validate :hostnames_cannot_be_repeated

  private

  def hostnames_cannot_be_repeated
    other_hostnames = Website.where.not(id: id).pluck(:hostnames).flatten
    return if (hostnames & other_hostnames).empty?
    errors.add(:hostnames, "already exists")
  end
end
