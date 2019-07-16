require "test_helper"

class SimpleChatStepTest < ActiveSupport::TestCase
  test "simple chat steps sorted after create, without order field" do
    ActsAsTenant.default_tenant = create(:account)

    simple_chat = create(:simple_chat_with_simple_chat_steps).reload
    3.times do
      create(:simple_chat_step_with_simple_chat_messages,
             simple_chat: simple_chat, key: Faker::Lorem.sentence)
    end
    result = simple_chat.simple_chat_steps.pluck(:order)

    assert_equal [1, 2, 3, 4], result
  end

  test "simple chat messages steps after create, with order field" do
    ActsAsTenant.default_tenant = create(:account)

    simple_chat = create(:simple_chat_with_simple_chat_steps).reload
    simple_chat.simple_chat_steps.first.destroy!

    create(:simple_chat_step_with_simple_chat_messages, simple_chat: simple_chat, order: 2, key: Faker::Lorem.sentence)
    create(:simple_chat_step_with_simple_chat_messages, simple_chat: simple_chat, order: 8, key: Faker::Lorem.sentence)
    create(:simple_chat_step_with_simple_chat_messages, simple_chat: simple_chat, order: 1)
    create(:simple_chat_step_with_simple_chat_messages, simple_chat: simple_chat, order: 3, key: Faker::Lorem.sentence)

    result = simple_chat.simple_chat_steps.pluck(:order)

    assert_equal [2, 8, 1, 3], result
  end
end
