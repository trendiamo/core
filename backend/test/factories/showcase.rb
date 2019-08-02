FactoryBot.define do
  factory :showcase do
    sequence(:title) { Faker::Lorem.words(2) }
    sequence(:subtitle) { Faker::Lorem.words(4) }
    sequence(:name) { Faker::StarWars.planet }
    seller
    association :owner, factory: :user

    factory :showcase_with_spotlights do
      transient do
        spotlights_count { 1 }
        product_picks_count { 1 }
      end

      after(:build) do |showcase, evaluator|
        showcase.spotlights = build_list(:spotlight_with_product_picks, evaluator.spotlights_count,
                                         product_picks_count: evaluator.product_picks_count, showcase: showcase)
        showcase.account = ActsAsTenant.default_tenant
      end
    end
  end
end
