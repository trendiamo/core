require_relative "scraper/client"
require_relative "scraper/options_parser"

module InstagramScraper
  class CLI
    def initialize(args)
      @args = args
    end

    def run
      options_parser = OptionsParser.new
      options = options_parser.parse(@args)
      client = Client.new(options)
      client.perform
    end
  end
end
