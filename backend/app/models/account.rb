class Account < ApplicationRecord
  has_many :websites, dependent: :destroy
  has_many :sellers, dependent: :destroy
  has_many :images, dependent: :destroy

  has_many :simple_chat_sections, dependent: :destroy
  has_many :simple_chat_messages, dependent: :destroy

  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  has_one :brand, dependent: :destroy
  has_many :affiliations, dependent: :destroy
  has_many :revenues, dependent: :destroy

  has_many :invites, dependent: :destroy

  accepts_nested_attributes_for :websites, allow_destroy: true

  before_validation :set_slug, on: :create

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true

  def as_json(_options = {})
    attributes.slice("name", "slug", "is_affiliate", "created_at", "updated_at").merge(websites_attributes: websites)
  end

  def duplicate(name, hostnames)
    DuplicateAccount.new(self, name, hostnames).perform
  end

  def set_slug
    self.slug = (name || "").parameterize
  end
end
