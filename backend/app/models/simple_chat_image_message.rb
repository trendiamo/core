class SimpleChatImageMessage < SimpleChatMessage
  belongs_to :img, class_name: "Image", touch: true

  def as_json(_options = {})
    super.except(:img_id).merge(attributes.slice("img_rect"), group_with_adjacent: group_with_adjacent)
         .merge(img: { url: img.url })
  end
end
