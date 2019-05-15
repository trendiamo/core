FactoryBot.define do
  factory :showcase do
    sequence(:title) { Faker::Lorem.words(2) }
    sequence(:subtitle) { Faker::Lorem.words(4) }
    sequence(:name) { Faker::StarWars.planet }
    persona
    association :owner, factory: :user

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
