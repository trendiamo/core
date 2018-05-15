FactoryBot.define do
  factory :comment do
    association :user, factory: :buyer
    product factory: :product
    content "This is a comment"
    pinned  "true"
    upvotes_count "12"
    inappropriate_flags_count "1"
  end
end
