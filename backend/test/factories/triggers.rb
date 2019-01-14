FactoryBot.define do
  factory :trigger do
    url_matchers { %w[/] }
    association :flow, factory: :outro
  end
end
