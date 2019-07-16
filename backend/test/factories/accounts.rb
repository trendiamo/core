FactoryBot.define do
  factory :account do
    sequence(:name) { Faker::Company.unique.name }
  end
end
