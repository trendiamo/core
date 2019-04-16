FactoryBot.define do
  factory :navigation_item do
    sequence(:url) { |i| "#{Faker::Internet.url}.#{i}" }
    sequence(:text) { Faker::Lorem.sentence }
    pic
  end
end
