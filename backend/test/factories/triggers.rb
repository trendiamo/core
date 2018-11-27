FactoryBot.define do
  factory :trigger do
    sequence(:order)
    sequence(:name) { Faker::Lorem.words(2) }
    url_matchers { %w[/] }
    association :flow, factory: :outro
  end
end
