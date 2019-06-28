require "redcarpet"

SimpleChatTextMessage.all.each do |message|
  message.update!(html: Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(message.text).strip)
end
