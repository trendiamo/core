FactoryBot.define do
  factory :upvote do
    user factory: :user
    comment factory: :comment
  end
end
