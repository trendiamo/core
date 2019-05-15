FactoryBot.define do
  factory :navigation do
    sequence(:name) { Faker::Lorem.words(2) }
    persona

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
