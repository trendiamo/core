require "test_helper"

class SpotlightTest < ActiveSupport::TestCase
  test "spotlights sorted after create" do
    ActsAsTenant.default_tenant = Account.create!

    showcase = create(:showcase)
    2.times { create(:spotlight, showcase: showcase) }
    result = showcase.spotlights.pluck(:order)

    assert_equal [1, 2], result
  end

  test "spotlights sorted after deleting spotlight and creating two new ones" do
    ActsAsTenant.default_tenant = Account.create!

    showcase = create(:showcase)
    3.times { create(:spotlight, showcase: showcase) }
    showcase.spotlights.first.destroy
    2.times { create(:spotlight, showcase: showcase) }
    result = showcase.spotlights.pluck(:order)

    assert_equal [2, 3, 4, 5], result
  end
end
