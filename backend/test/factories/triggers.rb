FactoryBot.define do
  factory :trigger do
    sequence(:order)
    url_matchers { %w[/] }
    association :flow, factory: :outro
  end
end
