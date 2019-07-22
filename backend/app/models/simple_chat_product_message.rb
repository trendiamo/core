class SimpleChatProductMessage < SimpleChatMessage
  belongs_to :pic, class_name: "Picture"

  validates :title, presence: true
  validates :url, presence: true

  def as_json(_options = {})
    super.except(:pic_id).merge(attributes.slice("title", "url", "display_price", "group_with_adjacent", "pic_rect"))
         .merge(picture: { url: pic.url })
  end
end
