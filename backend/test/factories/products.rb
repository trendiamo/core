FactoryBot.define do
  factory :product do
    association :user, factory: :owner
    product_ref { rand.to_s[2..13] }
  end
end
