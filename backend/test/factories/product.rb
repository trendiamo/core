FactoryBot.define do
  factory :product do
    association :user, factory: :owner
    sequence(:product_ref) { rand.to_s[2..13] }
  end
end
