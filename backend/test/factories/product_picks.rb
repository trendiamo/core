FactoryBot.define do
  factory :product_pick do
    sequence(:url) { Faker::Internet.url }
    sequence(:description) { Faker::Lorem.words(4) }
    sequence(:display_price) { Faker::Commerce.price }
    sequence(:name) { Faker::Commerce.product_name }
    pic
  end
end
