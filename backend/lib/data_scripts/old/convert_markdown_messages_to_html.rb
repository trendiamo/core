require "redcarpet"

SimpleChatTextMessage.where(html: nil).each do |message|
  message.update!(html: Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(message.text).strip)
end; nil
