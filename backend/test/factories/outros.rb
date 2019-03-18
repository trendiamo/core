FactoryBot.define do
  factory :outro do
    sequence(:name) { Faker::Lorem.words(2) }
    persona
    chat_bubble_text "Awesome! 🤩 Was I helpful?"
    chat_bubble_button_yes "Yes, thanks!"
    chat_bubble_button_no "Not really."
  end
end
