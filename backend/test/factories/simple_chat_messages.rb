FactoryBot.define do
  factory :simple_chat_message do
    sequence(:html) { Faker::Lorem.sentence }
    simple_chat_section

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
