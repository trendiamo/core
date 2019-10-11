class ConvertAndAssignSimpleChatImages
  def initialize(params)
    @params = params
  end

  def perform
    convert_and_assign_images
  end

  private

  def convert_and_assign_images
    @params[:simple_chat][:simple_chat_sections_attributes]&.each do |simple_chat_section_attributes|
      simple_chat_section_attributes[:simple_chat_messages_attributes]&.each do |simple_chat_message_attributes|
        img_url = (simple_chat_message_attributes[:img] && simple_chat_message_attributes[:img][:url])
        unless img_url.nil?
          return if img_url.empty?

          image = Image.find_by(url: img_url)

          return unless assign_image(simple_chat_message_attributes, image)
        end
      end
    end
  end

  def assign_image(simple_chat_message_attributes, image)
    return unless image

    simple_chat_message_attributes[:img_id] = image.id
    simple_chat_message_attributes.delete(:img_url)
    simple_chat_message_attributes
  end
end
