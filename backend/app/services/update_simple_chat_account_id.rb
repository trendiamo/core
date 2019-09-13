class UpdateSimpleChatAccountId
  def initialize(simple_chat, account_id)
    @simple_chat = simple_chat
    @account_id = account_id
  end

  def perform
    update_account_id
  end

  private

  def update_account_id
    # update_column is used to bypass ActsAsTenant approach to tenant immutability (see https://github.com/ErwinM/acts_as_tenant/issues/98)
    @simple_chat.update_column(:account_id, @account_id) # rubocop:disable Rails/SkipsModelValidations
    @simple_chat.simple_chat_sections.each do |simple_chat_section|
      simple_chat_section.update_column(:account_id, @account_id) # rubocop:disable Rails/SkipsModelValidations
      simple_chat_section.simple_chat_messages.each do |simple_chat_message|
        simple_chat_message.update_column(:account_id, @account_id) # rubocop:disable Rails/SkipsModelValidations
      end
    end
  end
end
