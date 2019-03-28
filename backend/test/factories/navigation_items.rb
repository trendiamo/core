FactoryBot.define do
  factory :navigation_item do
    sequence(:url) { Faker::Internet.url }
    sequence(:text) { Faker::Lorem.sentence }
    pic
  end
end
