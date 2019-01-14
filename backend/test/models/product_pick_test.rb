require "test_helper"

class ProductPickTest < ActiveSupport::TestCase
  test "product picks sorted after create" do
    ActsAsTenant.default_tenant = Account.create!

    showcase = create(:showcase)
    spotlight = create(:spotlight, showcase: showcase)
    2.times { create(:product_pick, spotlight: spotlight) }
    result = spotlight.product_picks.pluck(:order)

    assert_equal [1, 2], result
  end

  test "product picks sorted after deleting product pick and creating two new ones" do
    ActsAsTenant.default_tenant = Account.create!

    showcase = create(:showcase)
    spotlight = create(:spotlight, showcase: showcase)
    3.times { create(:product_pick, spotlight: spotlight) }
    spotlight.product_picks.first.destroy
    2.times { create(:product_pick, spotlight: spotlight) }
    result = spotlight.product_picks.pluck(:order)

    assert_equal [2, 3, 4, 5], result
  end
end
