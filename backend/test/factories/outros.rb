FactoryBot.define do
  factory :outro do
    sequence(:name) { Faker::Lorem.words(2) }
    persona
  end
end
