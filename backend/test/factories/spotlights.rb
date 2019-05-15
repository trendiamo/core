FactoryBot.define do
  factory :spotlight do
    persona

    after(:build) { |record| record.account = ActsAsTenant.default_tenant }
  end
end
