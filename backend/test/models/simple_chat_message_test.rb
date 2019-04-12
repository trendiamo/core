require "test_helper"

class SimpleChatMessageTest < ActiveSupport::TestCase
  test "duplicated simple chat preserves order of simple chat messages" do
    ActsAsTenant.default_tenant = Account.create!

    simple_chat = create(:simple_chat)
    simple_chat_step = create(:simple_chat_step, simple_chat: simple_chat)

    create(:simple_chat_message, simple_chat_step: simple_chat_step)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 2)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 8)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 3)

    result = simple_chat.simple_chat_steps.first.simple_chat_messages.each(&:attributes).pluck(:order)

    assert_equal [1, 2, 8, 3], result
  end
end
