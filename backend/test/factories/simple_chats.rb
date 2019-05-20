FactoryBot.define do
  factory :simple_chat do
    sequence(:name) { Faker::StarWars.planet }
    sequence(:title) { Faker::Lorem.words(2) }
    sequence(:chat_bubble_text) { Faker::Lorem.words(4) }
    sequence(:chat_bubble_extra_text) { Faker::Lorem.words(4) }
    persona
    association :owner, factory: :user

    factory :simple_chat_with_simple_chat_steps do
      transient do
        simple_chat_steps_count { 1 }
        simple_chat_messages_count { 1 }
      end

      after(:build) do |simple_chat, evaluator|
        simple_chat.simple_chat_steps = build_list(:simple_chat_step_with_simple_chat_messages,
                                                   evaluator.simple_chat_steps_count,
                                                   simple_chat_messages_count: evaluator.simple_chat_messages_count,
                                                   simple_chat: simple_chat)
        simple_chat.account = ActsAsTenant.default_tenant
      end
    end
  end
end
