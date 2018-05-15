FactoryBot.define do
  factory :collection do
    # handle Faker::App.name
    sequence(:handle) { Faker::App.name }
    title "This is the title"
    type "influencer"
    profile_pic_url "https://placeimg.com/480/480/people"
    cover_pic_url "https://placeimg.com/640/380/arch"
    description "This is my own collection"
  end
end
