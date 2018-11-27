FactoryBot.define do
  factory :website do
    name { Faker::Company.unique.name }
    hostnames { [Faker::Internet.unique.domain_name] }
  end
end
