require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  test "hostnames cannot be blank (nil case)" do
    ActsAsTenant.default_tenant = create(:account)

    @website = build(:website, hostnames: [])

    assert_not_predicate @website, :valid?
    assert_includes @website.errors[:hostnames], "can't be blank"
  end

  test "hostnames cannot be blank (empty string case)" do
    ActsAsTenant.default_tenant = create(:account)

    @website = build(:website, hostnames: [""])

    assert_not_predicate @website, :valid?
    assert_includes @website.errors[:hostnames], "can't be blank"
  end

  test "hostnames cannot be repeated" do
    ActsAsTenant.default_tenant = create(:account)
    create(:website, hostnames: %w[a.com b.com])
    create(:website, hostnames: %w[c.com])

    @website = build(:website, hostnames: %w[b.com])

    assert_not_predicate @website, :valid?
    assert_includes @website.errors[:hostnames], "already exists"
  end

  test "hostnames cannot be repeated even across accounts" do
    ActsAsTenant.with_tenant(create(:account)) do
      create(:website, hostnames: %w[other.com])
    end
    ActsAsTenant.default_tenant = create(:account)

    @website = build(:website, hostnames: %w[other.com])

    assert_not_predicate @website, :valid?
    assert_includes @website.errors[:hostnames], "already exists"
  end

  test ".find_by_hostname" do
    ActsAsTenant.default_tenant = create(:account)
    website1 = create(:website, hostnames: %w[a.com b.com])
    website2 = create(:website, hostnames: %w[c.com])

    assert_equal website1, Website.find_with_hostname("a.com")
    assert_equal website1, Website.find_with_hostname("b.com")
    assert_equal website2, Website.find_with_hostname("c.com")
    assert_nil Website.find_with_hostname("d.com")
  end
end
