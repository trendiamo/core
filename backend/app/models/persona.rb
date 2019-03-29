class Persona < ApplicationRecord
  include CleanupAssets

  acts_as_tenant

  paginates_per 10

  has_many :showcases, dependent: :destroy
  has_many :spotlights, dependent: :destroy
  has_many :simple_chats, dependent: :destroy
  has_many :outros, dependent: :destroy
  has_many :navigations, dependent: :destroy
  belongs_to :profile_pic, class_name: "Picture"
  belongs_to :profile_pic_animation, class_name: "Picture", optional: true

  validates :name, presence: true
  validates :description, presence: true

  def profile_pic_url
    profile_pic.url
  end

  def profile_pic_animation_url
    profile_pic_animation&.url
  end

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "account_id", "graphcms_ref", "instagram_url", "created_at", "updated_at")
      .merge(profile_pic_url: profile_pic_url, profile_pic_animation_url: profile_pic_animation_url)
  end
end
