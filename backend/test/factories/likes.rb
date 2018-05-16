FactoryBot.define do
  factory :like do
    user factory: :user
    product factory: :product
  end
end
