require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  test "hostnames cannot be repeated" do
    ActsAsTenant.default_tenant = Account.create!
    create(:website, hostnames: %w[a.com b.com])
    create(:website, hostnames: %w[c.com])

    @website = build(:website, hostnames: %w[b.com])

    assert !@website.valid?
    assert @website.errors[:hostnames].include?("already exists")
  end

  test "hostnames cannot be repeated even across accounts" do
    ActsAsTenant.with_tenant(Account.create!) do
      create(:website, hostnames: %w[other.com])
    end
    ActsAsTenant.default_tenant = Account.create!

    @website = build(:website, hostnames: %w[other.com])

    assert !@website.valid?
    assert @website.errors[:hostnames].include?("already exists")
  end
end
