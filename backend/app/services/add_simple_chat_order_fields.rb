class AddSimpleChatOrderFields
  def initialize(chat_attrs)
    @chat_attrs = chat_attrs
  end

  def perform
    add_order_fields
  end

  private

  # add order fields to chat_section_attributes' messages and options, based on received order
  def add_order_fields
    chat_sections_attrs = @chat_attrs[:simple_chat_sections_attributes]
    return unless chat_sections_attrs

    chat_sections_attrs&.each_with_index do |chat_section_attrs, i|
      chat_section_attrs[:order] = i + 1
      next unless chat_section_attrs[:simple_chat_messages_attributes]

      chat_section_attrs[:simple_chat_messages_attributes]&.each_with_index do |chat_message_attrs, l|
        chat_message_attrs[:order] = l + 1
      end
    end
    @chat_attrs
  end
end
