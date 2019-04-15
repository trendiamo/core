require "test_helper"

class SimpleChatMessageTest < ActiveSupport::TestCase
  test "simple chat messages sorted after create, without order field" do
    ActsAsTenant.default_tenant = Account.create!

    simple_chat = create(:simple_chat)
    simple_chat_step = create(:simple_chat_step, simple_chat: simple_chat)

    create(:simple_chat_message, simple_chat_step: simple_chat_step)
    create(:simple_chat_message, simple_chat_step: simple_chat_step)
    create(:simple_chat_message, simple_chat_step: simple_chat_step)
    create(:simple_chat_message, simple_chat_step: simple_chat_step)

    result = simple_chat.simple_chat_steps.first.simple_chat_messages.each(&:attributes).pluck(:order)

    assert_equal [1, 2, 3, 4], result
  end

  test "simple chat messages sorted after create, with order field" do
    ActsAsTenant.default_tenant = Account.create!

    simple_chat = create(:simple_chat)
    simple_chat_step = create(:simple_chat_step, simple_chat: simple_chat)

    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 2)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 8)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 1)
    create(:simple_chat_message, simple_chat_step: simple_chat_step, order: 3)

    result = simple_chat.simple_chat_steps.first.simple_chat_messages.each(&:attributes).pluck(:order)

    assert_equal [2, 8, 1, 3], result
  end
end
