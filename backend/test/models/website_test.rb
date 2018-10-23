require "test_helper"

class WebsiteTest < ActiveSupport::TestCase
  test "hostnames cannot be repeated" do
    create(:website, hostnames: %w[a.com b.com])
    create(:website, hostnames: %w[c.com])

    @website = build(:website, hostnames: "b.com")

    assert !@website.valid?
    assert @website.errors[:hostnames].include?("can't be blank")
  end
end
