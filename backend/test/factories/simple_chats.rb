FactoryBot.define do
  factory :simple_chat do
    sequence(:name) { Faker::StarWars.planet }
    sequence(:teaser_message) { Faker::Lorem.words(4) }
    sequence(:extra_teaser_message) { Faker::Lorem.words(4) }
    seller
    association :owner, factory: :user

    factory :simple_chat_with_simple_chat_sections do
      transient do
        simple_chat_sections_count { 1 }
        simple_chat_messages_count { 1 }
      end

      after(:build) do |simple_chat, evaluator|
        simple_chat.simple_chat_sections = build_list(:simple_chat_section_with_simple_chat_messages,
                                                      evaluator.simple_chat_sections_count,
                                                      simple_chat_messages_count: evaluator.simple_chat_messages_count,
                                                      simple_chat: simple_chat)
        simple_chat.account = ActsAsTenant.default_tenant
      end
    end
  end
end
