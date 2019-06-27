class TaggedProductsClient < ApplicationRecord
  def as_json(_options = {})
    attributes
      .slice("id", "hostname", "payload")
  end
end
