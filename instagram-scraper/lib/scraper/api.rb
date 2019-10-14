require "json"
require "sinatra/base"
require_relative "client"
require_relative "csv_util"

module InstagramScraper
  class Api < Sinatra::Base
    configure do
      set :show_exceptions, false
    end

    get "/" do
      @errors = []
      @options = parse_params(params)
      @client = Client.new(@options)
      validate_options
      return render_errors unless @errors.empty?

      posts = scrape_posts
      posts.empty? ? render_unsuccess_message : generate_csv_file(posts)
    end

    error do |e|
      add_error(e.message)
      render_errors
    end

    private

    def scrape_posts
      @options[:brands].reduce([]) do |posts, brand|
        brand_info = @client.scrape_brand_info(brand)
        next posts unless brand_info

        brand_posts = @client.scrape_brand_posts(brand_info[:id])
        next posts unless brand_posts

        posts + brand_posts
      end
    end

    def generate_csv_file(posts)
      content_type "application/csv"
      status 200
      attachment @options[:output]

      CSVUtil.generate_csv_from_posts(posts)
    end

    def parse_params(params) # rubocop:disable Metrics/AbcSize
      {
        brands: params[:brands]&.split(","),
        keywords: params[:keywords]&.split(","),
        min_likes: params[:min_likes]&.to_i,
        start_date: params[:start_date] && Date.new(*params[:start_date]&.split("-")&.map(&:to_i)),
        end_date: params[:end_date] && Date.new(*params[:end_date]&.split("-")&.map(&:to_i)),
        output: params[:output] || "IG Data (#{Time.now.strftime('%Y-%m-%d at %H.%M.%S')}).csv",
      }
    end

    def validate_options
      add_error("Invalid API key") unless request.env["HTTP_AUTHORIZATION"] == ENV["API_KEY"]
      add_error("You must specify at least one brand") unless @options[:brands]&.any?
      return unless @options[:start_date] && @options[:end_date] && @options[:start_date] > @options[:end_date]

      add_error("Start date must come before end date")
    end

    def add_error(error)
      @errors << error
    end

    def render_errors
      content_type :json
      status 400

      { errors: @errors }.to_json
    end

    def render_unsuccess_message
      content_type :json
      status 200

      { message: "No posts were found with the specified options" }.to_json
    end
  end
end
