FactoryBot.define do
  factory :website do
    name { Faker::Company.unique.name }
    hostnames { [Faker::Internet.unique.domain_name] }

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
