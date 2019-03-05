class PortScriptedChatsToSimpleChats
  def self.process
    new.process
  end

  def process
    port_scripted_chats
  end

  private

  def port_scripted_chats
    SimpleChat.destroy_all
    ScriptedChat.all.each do |scripted_chat|
      account = Account.find(scripted_chat.account_id)
      simple_chat = SimpleChat.create!(scripted_chat_data(scripted_chat, account))
      port_triggers(scripted_chat.triggers, simple_chat)
    end
  end

  def scripted_chat_data(scripted_chat, account)
    {
      title: scripted_chat.title,
      name: scripted_chat.name,
      chat_bubble_text: scripted_chat.chat_bubble_text,
      account: account,
      persona: Persona.find(scripted_chat.persona_id),
      simple_chat_steps_attributes: extract_simple_chat_step([], scripted_chat.chat_step, "default", account, 0),
    }
  end

  def extract_simple_chat_step(simple_chat_steps, chat_step, key, account, depth)
    return unless chat_step && depth <= 1
    simple_chat_steps << chat_step_data(chat_step, key, account)
    chat_step.chat_options.each do |chat_option|
      extract_simple_chat_step(simple_chat_steps, chat_option.destination_chat_step, chat_option.text, account,
                               depth + 1)
    end
    simple_chat_steps
  end

  def chat_step_data(chat_step, key, account)
    {
      key: key,
      simple_chat_messages_attributes: chat_step.chat_messages.map(&:attributes).pluck("text").map do |text|
        { text: text, account: account }
      end,
      account: account,
    }
  end

  def port_triggers(triggers, flow)
    triggers.each do |trigger|
      trigger.update!(flow: flow)
    end
  end
end

PortScriptedChatsToSimpleChats.process
