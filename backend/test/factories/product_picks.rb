FactoryBot.define do
  factory :product_pick do
    sequence(:url) { |i| "#{Faker::Internet.url}.#{i}" }
    sequence(:description) { Faker::Lorem.words(4) }
    sequence(:display_price) { Faker::Commerce.price }
    sequence(:name) { Faker::Commerce.product_name }
    pic

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
