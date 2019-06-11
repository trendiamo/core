class SimpleChatPictureMessage < SimpleChatMessage
  belongs_to :pic, class_name: "Picture"

  delegate :url, to: :pic, prefix: :pic

  def as_json(_options = {})
    super.except(:pic_id).merge(attributes.slice("pic_rect"), pic_url: pic_url,
                                                              group_with_adjacent: group_with_adjacent)
  end
end
