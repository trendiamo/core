FactoryBot.define do
  factory :simple_chat do
    sequence(:name) { Faker::StarWars.planet }
    sequence(:title) { Faker::Lorem.words(2) }
    sequence(:chat_bubble_text) { Faker::Lorem.words(4) }
    sequence(:chat_bubble_extra_text) { Faker::Lorem.words(4) }
    persona
  end
end
