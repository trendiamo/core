require "test_helper"

class SimpleChatMessageTest < ActiveSupport::TestCase
  test "simple chat messages sorted after create, without order field" do
    ActsAsTenant.default_tenant = create(:account)

    simple_chat = create(:simple_chat_with_simple_chat_steps, simple_chat_messages_count: 4)

    result = simple_chat.simple_chat_steps.first.simple_chat_messages.pluck(:order)

    assert_equal [1, 2, 3, 4], result
  end
end
