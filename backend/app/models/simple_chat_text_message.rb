class SimpleChatTextMessage < SimpleChatMessage
  validates :text, presence: true

  def as_json(_options = {})
    super.merge(text: text)
  end
end
