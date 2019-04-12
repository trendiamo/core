FactoryBot.define do
  factory :simple_chat_message do
    sequence(:text) { Faker::Lorem.sentence }
  end
end
