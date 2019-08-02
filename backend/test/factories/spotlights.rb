FactoryBot.define do
  factory :spotlight do
    seller
    showcase

    factory :spotlight_with_product_picks do
      transient do
        product_picks_count { 1 }
      end

      after(:build) do |spotlight, evaluator|
        spotlight.product_picks = build_list(:product_pick, evaluator.product_picks_count, spotlight: spotlight)
        spotlight.account = ActsAsTenant.default_tenant
      end
    end
  end
end
