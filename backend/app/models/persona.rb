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


  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "account_id", "graphcms_ref", "instagram_url", "profile_pic_animation_url",
             "pic_rect", "created_at", "updated_at", "lock_version").merge(profile_pic: { url: profile_pic.url })
  end
end
