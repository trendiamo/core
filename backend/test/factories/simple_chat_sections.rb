FactoryBot.define do
  factory :simple_chat_section do
    sequence(:key) { "default" }
    simple_chat

    factory :simple_chat_section_with_simple_chat_messages do
      transient do
        simple_chat_messages_count { 1 }
      end

      after(:build) do |simple_chat_section, evaluator|
        simple_chat_section.simple_chat_messages = build_list(:simple_chat_message,
                                                              evaluator.simple_chat_messages_count,
                                                              simple_chat_section: simple_chat_section)
        simple_chat_section.account = ActsAsTenant.default_tenant
      end
    end
  end
end
