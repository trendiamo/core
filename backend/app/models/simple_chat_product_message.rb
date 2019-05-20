class SimpleChatProductMessage < SimpleChatMessage
  belongs_to :pic, class_name: "Picture"

  validates :title, presence: true
  validates :url, presence: true
  validates :display_price, presence: true

  delegate :url, to: :pic, prefix: :pic

  def as_json(_options = {})
    super.except(:pic_id).merge(attributes.slice("title", "url", "display_price"),
                                pic_url: pic_url)
  end
end