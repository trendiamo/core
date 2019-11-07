require "json"
require "sinatra/base"
require_relative "../ext/csv"

module Scraper
  class Api < Sinatra::Base
    DOCS_URL = "https://trendiamo.postman.co/collections/8797404-d40f3f68-adcc-4314-8cc8-bc09560a9595".freeze

    configure do
      set :show_exceptions, false
    end

    configure :development do
      require "dotenv/load"
    end

    before do
      @errors = []
    end

    get "/docs" do
      redirect to(DOCS_URL)
    end

    not_found do
      add_error("This route doesn't exist. You can list all the available endpoints at scraper.uptous.co/docs")
      render_errors
    end

    error do |e|
      add_error(e.message)
      render_errors
    end

    private

    def validate_options
      add_error("Invalid API key") unless settings.development? || request.env["HTTP_AUTHORIZATION"] == ENV["API_KEY"]

      yield if block_given? && @errors.empty?
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

      { message: "No results were found with the specified options" }.to_json
    end

    def generate_csv_from_hash(hash, file_name = "data.csv")
      content_type "application/csv"
      status 200
      attachment file_name

      CSV.generate_from_hash(hash)
    end
  end
end
