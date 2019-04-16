require "test_helper"

class NavigationItemTest < ActiveSupport::TestCase
  test "navigation items sorted after create" do
    ActsAsTenant.default_tenant = Account.create!

    navigation = create(:navigation)
    2.times { create(:navigation_item, navigation: navigation) }
    result = navigation.navigation_items.pluck(:order)

    assert_equal [1, 2], result
  end

  test "navigation items sorted after deleting navigation item and creating two new ones" do
    ActsAsTenant.default_tenant = Account.create!

    navigation = create(:navigation)
    3.times { create(:navigation_item, navigation: navigation) }
    navigation.navigation_items.first.destroy!
    2.times { create(:navigation_item, navigation: navigation) }
    result = navigation.navigation_items.pluck(:order)

    assert_equal [2, 3, 4, 5], result
  end
end
