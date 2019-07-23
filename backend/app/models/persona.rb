class Persona < ApplicationRecord
  acts_as_tenant

  paginates_per 10

  has_many :showcases, dependent: :destroy
  has_many :spotlights, dependent: :destroy
  has_many :simple_chats, dependent: :destroy
  has_many :outros, dependent: :destroy
  belongs_to :profile_pic, class_name: "Picture"
  belongs_to :profile_pic_animation, class_name: "Picture", optional: true

  validates :name, presence: true
  validates :description, presence: true
  validate :animation_in_use_cannot_be_removed

  def modules
    showcases + spotlights + simple_chats + outros
  end

  def as_json(_options = {})
    attributes
      .slice("id", "name", "description", "account_id", "graphcms_ref", "instagram_url", "pic_rect",
             "created_at", "updated_at", "lock_version")
      .merge(profile_pic: { url: profile_pic.url }, profile_pic_animation: { url: profile_pic_animation&.url })
  end

  def animation_in_use_cannot_be_removed
    return unless profile_pic_animation&.url.blank? && modules.any?(&:use_persona_animation)

    errors.add(:profile_pic_animation, "is used in your modules")
  end
end
