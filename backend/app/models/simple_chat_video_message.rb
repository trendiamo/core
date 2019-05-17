class SimpleChatVideoMessage < SimpleChatMessage
  validates :video_url, presence: true

  def as_json(_options = {})
    super.merge(video_url: video_url)
  end
end
