FactoryBot.define do
  factory :spotlight do
    sequence(:text) { Faker::Lorem.words(4) }
    persona
  end
end
