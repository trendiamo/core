require "test_helper"

class UrlMatcherTest < ActiveSupport::TestCase
  test "matches root" do
    assert UrlMatcher.perform("/", "/")
  end

  test "matches simple url" do
    assert UrlMatcher.perform("/a", "/a")
  end

  test "does not match different urls" do
    assert_not UrlMatcher.perform("/a", "/b")
  end

  test "matches url with search (aka the query params)" do
    assert UrlMatcher.perform("/a?b=c", "/a?b=c")
  end
end
