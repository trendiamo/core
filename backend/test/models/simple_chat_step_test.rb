require "test_helper"

class SimpleChatStepTest < ActiveSupport::TestCase
  test "duplicated simple chat preserves order of simple chat steps" do
    ActsAsTenant.default_tenant = Account.create!

    simple_chat = create(:simple_chat)

    create(:simple_chat_step, simple_chat: simple_chat)
    create(:simple_chat_step, simple_chat: simple_chat, order: 2, key: Faker::Lorem.sentence)
    create(:simple_chat_step, simple_chat: simple_chat, order: 8, key: Faker::Lorem.sentence)
    create(:simple_chat_step, simple_chat: simple_chat, order: 3, key: Faker::Lorem.sentence)

    result = simple_chat.simple_chat_steps.each(&:attributes).pluck(:order)

    assert_equal [1, 2, 8, 3], result
  end
end
