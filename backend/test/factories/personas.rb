FactoryBot.define do
  factory :persona do
    sequence(:name) { Faker::RickAndMorty.character }
    sequence(:description) { Faker::RickAndMorty.quote }
    profile_pic

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
