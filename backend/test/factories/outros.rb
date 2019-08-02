FactoryBot.define do
  factory :outro do
    sequence(:name) { Faker::Lorem.words(2) }
    seller
    chat_bubble_text "Awesome! 🤩 Was I helpful?"
    chat_bubble_button_yes "Yes, thanks!"
    chat_bubble_button_no "Not really."
    association :owner, factory: :user

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
