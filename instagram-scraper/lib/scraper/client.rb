require "date"
require "json"
require "net/http"
require "open-uri"

BASE_URL = "https://www.instagram.com".freeze
BUNDLE_PATH = "/static/bundles/metro/ProfilePageContainer.js".freeze
QUERY_ID_PATTERN = /[^\)]\.pagination},queryId:"([\w\d]{32})"/.freeze
NETWORK_ERRORS = [
  EOFError,
  Errno::ECONNREFUSED,
  Errno::ECONNRESET,
  Errno::EHOSTUNREACH,
  Net::OpenTimeout,
  OpenURI::HTTPError,
].freeze

module InstagramScraper
  class Client
    class HTTPProxy
      def initialize(proxies)
        @proxies = proxies
        @proxy_index = -1
      end

      def open(uri)
        URI.open(uri)
      rescue *NETWORK_ERRORS => e
        handle_network_error(uri, e)
      end

      private

      def open_with_proxy(uri)
        proxy = @proxies[@proxy_index]
        unless proxy
          @proxy_index = 0
          self.open(uri)
        end

        begin
          return URI.open(uri, proxy: proxy)
        rescue *NETWORK_ERRORS => e
          handle_network_error(uri, e)
        end
      end

      def handle_network_error(uri, error)
        raise error if error.class == OpenURI::HTTPError && error.io.status.first == "404"

        @proxy_index += 1
        open_with_proxy(uri)
      end
    end

    def initialize(options, proxies)
      @keywords = options[:keywords] || []
      @min_likes = options[:min_likes] || 500
      @start_date = options[:start_date] || Date.new(2018, 1, 1)
      @end_date = options[:end_date] || Date.today
      @http_proxy = HTTPProxy.new(proxies)
    end

    def scrape_brand_info(brand)
      brand_url = "#{BASE_URL}/#{brand}"
      brand_data = JSON.parse(@http_proxy.open("#{brand_url}/?__a=1").read)
      brand_info = brand_data["graphql"]["user"]
      {
        id: brand_info["id"],
        name: brand_info["full_name"] || brand,
        username: brand,
        url: brand_url,
      }
    end

    def scrape_brand_posts(brand_id, end_cursor = "", posts = [])
      while end_cursor
        posts_data, end_cursor = scrape_posts(brand_id, end_cursor)
        break unless posts_data

        posts_data.each do |post_data|
          post = parse_post_data(post_data["node"])
          next unless post

          posts << post
        end
      end
      posts
    end

    private

    def scrape_posts(brand_id, end_cursor)
      posts_url = build_posts_url(brand_id, end_cursor)
      response = JSON.parse(@http_proxy.open(posts_url).read)
      parse_response(response)
    end

    def build_posts_url(brand_id, end_cursor)
      query_params = build_query_params(brand_id, end_cursor)
      "#{BASE_URL}/graphql/query/?#{URI.encode_www_form(query_params)}"
    end

    def build_query_params(brand_id, end_cursor)
      query_hash = scrape_query_hash
      {
        query_hash: query_hash,
        variables: {
          id: brand_id,
          first: 50,
          after: end_cursor,
        }.to_json,
      }
    end

    def scrape_query_hash
      bundle_name = @http_proxy.open(BASE_URL).read.match(%r{#{BUNDLE_PATH}\/([\w\d]{12})\.js})[1]
      bundle_url = "#{BASE_URL}#{BUNDLE_PATH}/#{bundle_name}.js"
      @http_proxy.open(bundle_url).read.match(QUERY_ID_PATTERN)[1]
    end

    def parse_response(response)
      data = response["data"]["user"]["edge_user_to_photos_of_you"]
      posts_data = data["edges"]
      end_cursor = data["page_info"]["end_cursor"]
      [posts_data, end_cursor]
    end

    def parse_post_data(post_data) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      publisher = post_data["owner"]["username"]
      post_url = "#{BASE_URL}/p/#{post_data['shortcode']}"
      likes = post_data["edge_liked_by"]["count"]
      timestamp = post_data["taken_at_timestamp"]
      caption = post_data["edge_media_to_caption"]["edges"]&.first&.[]("node")&.[]("text")&.gsub(/\n/, " ")
      country_code = scrape_country_code(post_url)
      return if likes < @min_likes || !timestamp.between?(@start_date.to_time.to_i, @end_date.to_time.to_i)
      unless @keywords.empty? || caption && @keywords.map(&:downcase).any? { |word| caption.downcase.include?(word) }
        return
      end

      {
        publisher: publisher,
        publisher_url: "#{BASE_URL}/#{publisher}",
        post_url: post_url,
        likes: likes,
        comments: post_data["edge_media_to_comment"]["count"],
        date: Time.at(timestamp).strftime("%Y-%m-%d"),
        caption: caption,
        country_code: country_code,
      }
    end

    def scrape_country_code(post_url)
      location = JSON.parse(@http_proxy.open("#{post_url}/?__a=1").read)["graphql"]["shortcode_media"]["location"]&.[]("address_json") # rubocop:disable Metrics/LineLength
    rescue JSON::ParserError, OpenURI::HTTPError
      ""
    else
      return unless location

      JSON.parse(location)&.[]("country_code")
    end
  end
end
