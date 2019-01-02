FactoryBot.define do
  factory :navigation do
    sequence(:name) { Faker::Lorem.words(2) }
    persona
  end
end
