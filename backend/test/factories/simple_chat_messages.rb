FactoryBot.define do
  factory :simple_chat_message do
    sequence(:text) { Faker::Lorem.sentence }
    simple_chat_step

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
