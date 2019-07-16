require "test_helper"

class SpotlightTest < ActiveSupport::TestCase
  test "spotlights sorted after create" do
    ActsAsTenant.default_tenant = create(:account)

    showcase = create(:showcase_with_spotlights, spotlights_count: 2)
    result = showcase.spotlights.pluck(:order)

    assert_equal [1, 2], result
  end

  test "spotlights sorted after deleting spotlight and creating two new ones" do
    ActsAsTenant.default_tenant = create(:account)

    # fails to update later changes to showcase.spotlights without the .reload
    showcase = create(:showcase_with_spotlights, spotlights_count: 3).reload
    showcase.spotlights.first.destroy!
    create_pair(:spotlight_with_product_picks, showcase: showcase)
    result = showcase.spotlights.pluck(:order)

    assert_equal [2, 3, 4, 5], result
  end
end
