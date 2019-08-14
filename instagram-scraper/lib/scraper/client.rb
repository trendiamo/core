require "csv"
require "json"
require_relative "./http_proxy"
require_relative "./logger"

BASE_URL = "https://www.instagram.com".freeze
BUNDLE_PATH = "/static/bundles/metro/ProfilePageContainer.js".freeze
QUERY_ID_PATTERN = /[^\)]\.pagination},queryId:"([\w\d]{32})"/.freeze

module InstagramScraper
  class Client
    def initialize(options)
      @brands = options.brands
      @min_likes = options.min_likes
      @start_date = options.start_date
      @end_date = options.end_date
      @output = options.output
      @posts_count = 0
      @http_proxy = HTTPProxy.new
      @logger = Logger.new
    end

    def perform
      scrape_brands
      log_result_message
    end

    private

    def scrape_brands
      @brands.each do |brand|
        brand_data = scrape_brand_data(brand)
      rescue OpenURI::HTTPError
        @logger.log_error_message("Can't find profile with username #{brand}")
        @brands.delete(brand)
        scrape_brands
      else
        scrape_brand_posts(brand_data)
      end
    end

    def scrape_brand_data(brand)
      brand_url = "#{BASE_URL}/#{brand}"
      brand_data = JSON.parse(@http_proxy.open("#{brand_url}/?__a=1").read)["graphql"]["user"]
      {
        id: brand_data["id"],
        brand: brand_data["full_name"],
        brand_url: brand_url,
      }
    end

    def scrape_brand_posts(brand_data, end_cursor = "")
      query_hash = scrape_query_hash
      while end_cursor
        query_params = build_query_params(query_hash, brand_data[:id], end_cursor)
        posts_url = "#{BASE_URL}/graphql/query/?#{URI.encode_www_form(query_params)}"
        posts_data = JSON.parse(@http_proxy.open(posts_url).read)["data"]["user"]["edge_user_to_photos_of_you"]
        break unless posts_data

        end_cursor = posts_data["page_info"]["end_cursor"]
        parse_and_store_data(brand_data, posts_data["edges"])
      end
    end

    def scrape_query_hash
      bundle_name = @http_proxy.open(BASE_URL).read.match(%r{#{BUNDLE_PATH}\/([\w\d]{12})\.js})[1]
      bundle_url = "#{BASE_URL}#{BUNDLE_PATH}/#{bundle_name}.js"
      @http_proxy.open(bundle_url).read.match(QUERY_ID_PATTERN)[1]
    end

    def build_query_params(query_hash, brand_id, end_cursor)
      {
        query_hash: query_hash,
        variables: {
          id: brand_id,
          first: 50,
          after: end_cursor,
        }.to_json,
      }
    end

    def parse_and_store_data(brand_data, posts_data)
      posts_data.each do |post_data|
        post = parse_post_data(post_data["node"])
        next unless post

        store_in_csv(brand_data.slice(:brand, :brand_url).merge(post))
      end
    end

    def parse_post_data(post_data) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      publisher = post_data["owner"]["username"]
      likes = post_data["edge_liked_by"]["count"]
      timestamp = post_data["taken_at_timestamp"]
      return if likes < @min_likes || !timestamp.between?(@start_date.to_time.to_i, @end_date.to_time.to_i)

      {
        publisher: publisher,
        publisher_url: "#{BASE_URL}/#{publisher}",
        post_url: "#{BASE_URL}/p/#{post_data['shortcode']}",
        likes: likes,
        comments: post_data["edge_media_to_comment"]["count"],
        date: Time.at(timestamp).strftime("%Y/%m/%d"),
        caption: post_data["edge_media_to_caption"]["edges"]&.first&.[]("node")&.[]("text")&.gsub(/\n/, " "),
      }
    end

    def store_in_csv(post)
      CSV.open(@output, "a+") do |csv|
        csv << post.keys.map { |key| key.to_s.tr("_", " ").capitalize } if csv.read.empty?
        csv << post.values
      end
      @posts_count += 1
      @logger.log_recursive_message("Scraped #{@posts_count} posts")
    end

    def log_result_message
      if @posts_count.zero?
        @logger.log_error_message("No data found with the specified parameters")
      else
        @logger.log_success_message("Done! Scraped #{@posts_count} posts from #{@brands.join(', ')}. " \
                                    "File successfully saved in #{@output}")
      end
    end
  end
end
