FactoryBot.define do
  factory :website do
    name { Faker::Company.unique.name }
    title Faker::Company.catch_phrase
    hostnames { [Faker::Internet.unique.domain_name] }
  end
end
