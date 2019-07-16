class WebsiteSettings < ApplicationRecord
  acts_as_tenant

  belongs_to :website

  enum text_color: %i[white black]

  def as_json(_options = {})
    attributes
      .slice("id", "website_id", "theme_color", "text_color", "round_edges", "created_at", "updated_at")
  end
end
