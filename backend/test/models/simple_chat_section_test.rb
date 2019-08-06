require "test_helper"

class SimpleChatSectionTest < ActiveSupport::TestCase
  test "simple chat sections sorted after create, without order field" do
    ActsAsTenant.default_tenant = create(:account)

    simple_chat = create(:simple_chat_with_simple_chat_sections).reload
    3.times do
      create(:simple_chat_section_with_simple_chat_messages,
             simple_chat: simple_chat, key: Faker::Lorem.sentence)
    end
    result = simple_chat.simple_chat_sections.pluck(:order)

    assert_equal [1, 2, 3, 4], result
  end

  test "simple chat messages sections after create, with order field" do
    ActsAsTenant.default_tenant = create(:account)

    chat = create(:simple_chat_with_simple_chat_sections).reload
    chat.simple_chat_sections.first.destroy!

    create(:simple_chat_section_with_simple_chat_messages, simple_chat: chat, order: 2, key: Faker::Lorem.sentence)
    create(:simple_chat_section_with_simple_chat_messages, simple_chat: chat, order: 8, key: Faker::Lorem.sentence)
    create(:simple_chat_section_with_simple_chat_messages, simple_chat: chat, order: 1)
    create(:simple_chat_section_with_simple_chat_messages, simple_chat: chat, order: 3, key: Faker::Lorem.sentence)

    result = chat.simple_chat_sections.pluck(:order)

    assert_equal [2, 8, 1, 3], result
  end
end
