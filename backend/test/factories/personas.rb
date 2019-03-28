FactoryBot.define do
  factory :persona do
    sequence(:name) { Faker::RickAndMorty.character }
    sequence(:description) { Faker::RickAndMorty.quote }
    profile_pic
  end
end
