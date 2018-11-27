class UrlMatcher
  attr_reader :pathname, :url_matcher

  def self.perform(pathname, url_matcher)
    new(pathname, url_matcher).perform
  end

  def initialize(pathname, url_matcher)
    @pathname = pathname
    @url_matcher = url_matcher
  end

  def perform
    return true if url_matcher == "*"
    match_url
  end

  private

  def segmentize(url)
    url.gsub(%r{(^/+|/+$)}, "").split("/")
  end

  # Adapted from react-router
  # rubocop:disable Metrics/AbcSize,Metrics/MethodLength,Metrics/CyclomaticComplexity,Metrics/PerceivedComplexity
  def match_url
    reg = /(?:\?([^#]*))?(#.*)?$/
    match_data = pathname.match(reg)
    matches = {}
    ret = nil
    if match_data && match_data[1]
      p = match_data[1].split("&")
      p.each do |e|
        r = e.split("=")
        matches[CGI.unescape(r[0])] = CGI.unescape(r.slice(1).join("="))
      end
    end
    url = segmentize(pathname.sub(reg, ""))
    route = segmentize(url_matcher || "")
    max = [url.length, route.length].max
    i = 0
    while i < max
      if route[i] && route[i][0] == ":"
        flags = (route[i].match(/[+*?]+$/) || {})[0] || ""
        param = route[i].gsub(/(^:|[+*?]+$)/, "")
        plus = flags.index("+")
        star = flags.index("*")
        val = url[i] || ""
        if !val && !star && (flags.index("?").negative? || plus)
          ret = false
          break
        end
        matches[param] = CGI.unescape(val)
        if plus || star
          matches[param] = url.slice(i).map(CGI.unescape).join("/")
          break
        end
      elsif route[i] != url[i]
        ret = false
        break
      end
      i += 1
    end
    return false if ret == false
    matches
  end
  # rubocop:enable Metrics/AbcSize,Metrics/MethodLength,Metrics/CyclomaticComplexity,Metrics/PerceivedComplexity
end
