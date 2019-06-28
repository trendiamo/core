class SimpleChatTextMessage < SimpleChatMessage
  validates :html, presence: true

  def as_json(_options = {})
    super.merge(html: html)
  end
end
