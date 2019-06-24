class SimpleChatPictureMessage < SimpleChatMessage
  belongs_to :pic, class_name: "Picture"

  delegate :url, to: :pic, prefix: :pic

  def as_json(_options = {})
    super.except(:pic_id).merge(attributes.slice("pic_rect"), group_with_adjacent: group_with_adjacent)
         .merge(picture: { url: pic.url },
                # to remove :pic_url once backend and console-frontend is deployed
                pic_url: pic_url)
  end
end
