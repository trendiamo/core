require "redcarpet"

class SimpleChatTextMessage < SimpleChatMessage
  validate :text_must_be_present

  def as_json(_options = {})
    super.merge(html: html || Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(text))
  end

  def text_must_be_present
    return if html.present? || text.present?

    errors.add((html || text).to_sym, "can't be blank")
  end
end
