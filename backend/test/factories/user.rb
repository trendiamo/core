FactoryBot.define do
  factory :user, aliases: [:owner, :buyer] do
    sequence(:first_name) { Faker::Name.first_name }
    sequence(:last_name) { Faker::Name.last_name }
    sequence(:username) { Faker::Internet.user_name(:last_name) }
    sequence(:email) { Faker::Internet.email(:last_name) }
    sequence(:password) { Faker::Internet.password(8) }
  end
end
