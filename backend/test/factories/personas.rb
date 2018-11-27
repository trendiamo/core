FactoryBot.define do
  factory :persona do
    sequence(:name) { Faker::RickAndMorty.character }
    sequence(:description) { Faker::RickAndMorty.quote }
    sequence(:profile_pic_url) { |i| "https://randomuser.me/api/portraits/men/#{i % 99}.jpg" }
  end
end
