FactoryBot.define do
  factory :fenced_collection do
    collection factory: :collection
    sequence(:domain_name) { Faker::Internet.domain_name }
    favicon_url "https://placeimg.com/480/480/animals/grayscale"
  end
end
