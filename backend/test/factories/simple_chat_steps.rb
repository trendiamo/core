FactoryBot.define do
  factory :simple_chat_step do
    sequence(:key) { "default" }

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
