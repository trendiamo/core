FactoryBot.define do
  factory :user do
    sequence(:first_name) { Faker::Name.first_name }
    sequence(:last_name) { Faker::Name.last_name }
    sequence(:email) { Faker::Internet.email(:last_name) }
    sequence(:password) { Faker::Internet.password(8) }

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
