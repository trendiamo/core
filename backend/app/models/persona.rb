class Persona < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  has_many :showcases, dependent: :destroy
  has_many :spotlights, dependent: :destroy
  has_many :simple_chats, dependent: :destroy
  has_many :outros, dependent: :destroy
  has_many :navigations, dependent: :destroy
  belongs_to :profile_pic, class_name: "Picture"

  validates :name, presence: true
  validates :description, presence: true

  def profile_pic_url
    profile_pic.url
  end

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "account_id", "graphcms_ref", "instagram_url", "profile_pic_animation_url",
             "created_at", "updated_at").merge(profile_pic_url: profile_pic_url)
  end
end
