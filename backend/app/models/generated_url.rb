class GeneratedUrl < ApplicationRecord
  belongs_to :user

  def as_json(_options = {})
    attributes.slice("id", "url")
  end
end
