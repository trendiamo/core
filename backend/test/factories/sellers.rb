FactoryBot.define do
  factory :seller do
    sequence(:name) { Faker::RickAndMorty.character }
    sequence(:bio) { Faker::RickAndMorty.quote }
    association :img, factory: :picture

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
