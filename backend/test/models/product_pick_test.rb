require "test_helper"

class ProductPickTest < ActiveSupport::TestCase
  test "product picks sorted after create" do
    ActsAsTenant.default_tenant = create(:account)

    showcase = create(:showcase_with_spotlights, product_picks_count: 2)
    result = showcase.spotlights.first.product_picks.pluck(:order)

    assert_equal [1, 2], result
  end

  test "product picks sorted after deleting product pick and creating two new ones" do
    ActsAsTenant.default_tenant = create(:account)

    showcase = create(:showcase_with_spotlights, product_picks_count: 3).reload
    spotlight = showcase.spotlights.first
    spotlight.product_picks.first.destroy!
    create_pair(:product_pick, spotlight: spotlight)
    result = spotlight.product_picks.pluck(:order)

    assert_equal [2, 3, 4, 5], result
  end
end
