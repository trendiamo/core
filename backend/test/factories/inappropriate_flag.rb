FactoryBot.define do
  factory :inappropriate_flag do
    user factory: :user
    comment factory: :comment
  end
end
