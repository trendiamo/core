class Persona < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  has_many :showcases, dependent: :destroy
  has_many :spotlights, dependent: :destroy
  has_many :simple_chats, dependent: :destroy
  has_many :outros, dependent: :destroy
  belongs_to :profile_pic, class_name: "Picture"

  validates :name, presence: true
  validates :description, presence: true

  delegate :url, to: :profile_pic, prefix: :profile_pic

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "account_id", "graphcms_ref", "instagram_url", "profile_pic_animation_url",
             "created_at", "updated_at", "lock_version").merge(profile_pic_url: profile_pic_url)
  end
end
