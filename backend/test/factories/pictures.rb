FactoryBot.define do
  factory :picture, aliases: %i[pic] do
    sequence(:url) { Faker::LoremPixel.image }

    factory :profile_pic do
      sequence(:url) { |i| "https://randomuser.me/api/portraits/men/#{i % 99}.jpg" }
    end
  end
end
