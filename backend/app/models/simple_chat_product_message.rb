class SimpleChatProductMessage < SimpleChatMessage
  belongs_to :img, class_name: "Image", touch: true

  validates :title, presence: true
  validates :url, presence: true

  def as_json(_options = {})
    super.except(:img_id).merge(attributes.slice("title", "url", "display_price", "group_with_adjacent", "img_rect"))
         .merge(img: { url: img.url })
         .merge(picture: { url: img.url }, pic_rect: img_rect)
  end
end
