FactoryBot.define do
  factory :trigger do
    url_matchers { %w[/] }
    association :flow, factory: :outro

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
