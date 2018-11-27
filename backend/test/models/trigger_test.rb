require "test_helper"

class TriggerTest < ActiveSupport::TestCase
  test ".find_matching, no triggers exist" do
    ActsAsTenant.default_tenant = Account.create!

    result = Trigger.find_matching("/")

    assert_nil result
  end

  test ".find_matching, with just one direct-matching trigger" do
    ActsAsTenant.default_tenant = Account.create!
    trigger = create(:trigger, url_matchers: %w[/])

    result = Trigger.find_matching("/")

    assert_equal result, trigger
  end

  test ".find_matching, with just one star-matching trigger" do
    ActsAsTenant.default_tenant = Account.create!
    trigger = create(:trigger, url_matchers: %w[*])

    result = Trigger.find_matching("/abc")

    assert_equal result, trigger
  end

  test ".find_matching, with just one param-matching trigger" do
    ActsAsTenant.default_tenant = Account.create!
    trigger = create(:trigger, url_matchers: %w[/products/:productId])

    result = Trigger.find_matching("/products/34")

    assert_equal result, trigger
  end

  test ".find_matching, with just one non-matching trigger" do
    ActsAsTenant.default_tenant = Account.create!
    build(:trigger, url_matchers: %w[/])

    result = Trigger.find_matching("/def")

    assert_nil result
  end
end
