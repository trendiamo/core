FactoryBot.define do
  factory :seller do
    sequence(:name) { Faker::RickAndMorty.character }
    sequence(:bio) { Faker::RickAndMorty.quote }
    profile_pic

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
