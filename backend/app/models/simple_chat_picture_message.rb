class SimpleChatPictureMessage < SimpleChatMessage
  belongs_to :pic, class_name: "Picture"

  def as_json(_options = {})
    super.except(:pic_id).merge(attributes.slice("pic_rect"), group_with_adjacent: group_with_adjacent)
         .merge(picture: { url: pic.url })
  end
end
