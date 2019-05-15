FactoryBot.define do
  factory :navigation_item do
    sequence(:url) { |i| "#{Faker::Internet.url}.#{i}" }
    sequence(:text) { Faker::Lorem.sentence }
    pic

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
