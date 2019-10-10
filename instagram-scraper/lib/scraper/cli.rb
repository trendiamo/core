require "date"
require "optparse"
require_relative "client"
require_relative "csv_util"
require_relative "version"

DEFAULT_OPTIONS = {
  output: "#{Dir.home}/Desktop/IG Data (#{Time.now.strftime('%Y-%m-%d at %H.%M.%S')}).csv",
}.freeze

module InstagramScraper
  class CLI
    class Logger
      def log_message(message)
        puts message
      end

      def log_recursive_message(message)
        print "#{message}\r"
      end

      def log_success_message(message)
        puts "\e[32m#{message}\e[0m"
      end

      def log_error_message(message)
        puts "\e[31m#{message}\e[0m"
      end
    end

    class OptionsParser
      class ScriptOptions
        attr_accessor :brands, :keywords, :min_likes, :start_date, :end_date, :output

        def initialize(options = {})
          @keywords = options[:keywords]
          @min_likes = options[:min_likes]
          @start_date = options[:start_date]
          @end_date = options[:end_date]
          @output = options[:output]
        end

        def define_parser_options(parser)
          parser.banner = "Usage: instagram-scraper [options]"
          parser.separator ""
          parser.separator "Specific options:"
          define_specific_options(parser)
          parser.separator ""
          parser.separator "Common options:"
          define_common_options(parser)
        end

        def to_hash
          Hash[instance_variables.map { |option| [option[1..-1].to_sym, instance_variable_get(option)] }]
        end

        private

        def define_specific_options(parser)
          define_brands_option(parser)
          define_keywords_option(parser)
          define_min_likes_option(parser)
          define_start_date_option(parser)
          define_end_date_option(parser)
          define_output_option(parser)
        end

        def define_common_options(parser)
          define_help_option(parser)
          define_version_option(parser)
        end

        def define_brands_option(parser)
          parser.on("-b", "--brands x,y,z",
                    String,
                    "Specify one or multiple (comma-separated) usernames of profiles to scrape " \
                    "(e.g. nike,adidas,puma)") do |brands|
            @brands = brands.split(",")
          end
        end

        def define_keywords_option(parser)
          parser.on("-k", "--keywords x,y,z",
                    String,
                    "Specify one or multiple (comma-separated) keywords that must be present in a post caption " \
                    "(e.g. fashion,influencer,blogger)") do |keywords|
            @keywords = keywords.split(",")
          end
        end

        def define_min_likes_option(parser)
          parser.on("-l", "--min-likes [NUMBER]",
                    Integer,
                    "Specify the minimum amount of likes for a post " \
                    "(defaults to 500)") do |min_likes|
            @min_likes = min_likes
          end
        end

        def define_start_date_option(parser)
          parser.on("-s", "--start-date [DATE]",
                    String,
                    "Specify the minimum date for a post in YYYY-MM-DD format " \
                    "(defaults to 2018-01-01)") do |start_date|
            @start_date = Date.new(*start_date.split("-").map(&:to_i))
          end
        end

        def define_end_date_option(parser)
          parser.on("-e", "--end-date [DATE]",
                    String,
                    "Specify the maximum date for a post in YYYY-MM-DD format " \
                    "(defaults to today)") do |end_date|
            @end_date = Date.new(*end_date.split("-").map(&:to_i))
          end
        end

        def define_output_option(parser)
          parser.on("-o", "--output [FILE_PATH]",
                    String,
                    "Specify an output file relative to your home directory " \
                    "(defaults to 'Desktop/IG Data (<timestamp>).csv')") do |output|
            @output = "#{Dir.home}/#{output}"
          end
        end

        def define_help_option(parser)
          parser.on_tail("-h", "--help", "Print this help message") do
            puts parser
            exit
          end
        end

        def define_version_option(parser)
          parser.on_tail("-v", "--version", "Print the current version of the app") do
            puts "instagram-scraper #{VERSION}"
            exit
          end
        end
      end

      def initialize(options = {})
        @options = ScriptOptions.new(options)
      end

      def parse(args)
        OptionParser.new do |parser|
          @options.define_parser_options(parser)
          parse_options(parser, args)
        end
        @options
      end

      private

      def parse_options(parser, args)
        parser.parse!(args)
        validate_options
      end

      def validate_options
        raise OptionParser::MissingArgument, "brands must be specified" unless @options.brands
        return unless @options.output

        raise OptionParser::InvalidArgument, "#{@options.output} already exists" if File.exist?(@options.output)

        output_dir = @options.output.rpartition("/")[0]
        raise OptionParser::InvalidArgument, "the folder #{output_dir} doesn't exist" unless File.directory?(output_dir)
      end
    end

    def initialize(args, defaults = DEFAULT_OPTIONS)
      @args = args
      @defaults = defaults
      @logger = Logger.new
      @posts_count = 0
    end

    def run
      @options = parse_options
      @client = Client.new(@options)
      run_client
      log_final_message
    end

    private

    def parse_options
      options_parser = OptionsParser.new(@defaults)
      options = options_parser.parse(@args)
    rescue OptionParser::ParseError => e
      @logger.log_error_message(e)
      exit
    else
      options.to_hash
    end

    def run_client
      @options[:brands].each do |brand_username|
        brand = scrape_brand_info(brand_username)
        next unless brand

        posts = scrape_brand_posts(brand)
        @posts_count += posts.count
        store_brand_posts(brand, posts)
      end
    end

    def scrape_brand_info(brand_username)
      @client.scrape_brand_info(brand_username)
    rescue OpenURI::HTTPError
      @logger.log_error_message("Can't find profile with username #{brand_username}")
    end

    def scrape_brand_posts(brand)
      @logger.log_recursive_message("Scraping data from #{brand[:name]}..")
      @client.scrape_brand_posts(brand[:id])
    end

    def store_brand_posts(brand, posts)
      if posts.empty?
        @logger.log_error_message("Can't find any valid post for #{brand[:name]}")
      else
        CSVUtil.store_posts_in_csv(@options[:output], posts)
        @logger.log_success_message("Scraped #{posts.count} posts from #{brand[:name]}")
      end
    end

    def log_final_message
      @logger.log_message("")
      if @posts_count.zero?
        @logger.log_error_message("😱 No posts were found with the specified options")
      else
        @logger.log_success_message("🎉 Done! #{@posts_count} posts successfully saved in '#{@options[:output]}'")
      end
    end
  end
end
