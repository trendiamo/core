FactoryBot.define do
  factory :showcase do
    sequence(:title) { Faker::Lorem.words(2) }
    sequence(:subtitle) { Faker::Lorem.words(4) }
    sequence(:name) { Faker::StarWars.planet }
    persona
  end
end
