require "date"
require "optparse"
require_relative "./logger"
require_relative "./version"

module InstagramScraper
  class OptionsParser
    class ScriptOptions < OptionsParser
      attr_reader :logger
      attr_accessor :brands, :min_likes, :start_date, :end_date, :output

      def initialize
        @min_likes = 500
        @start_date = Date.new(2018, 1, 1)
        @end_date = Date.today
        @output = "#{Dir.home}/Desktop/instagram-data.csv"
        @logger = Logger.new
      end

      def define_options(parser)
        parser.banner = "Usage: instagram-scraper [options]"
        parser.separator ""
        parser.separator "Specific options:"
        define_specific_options(parser)
        parser.separator ""
        parser.separator "Common options:"
        define_common_options(parser)
      end

      private

      def define_specific_options(parser)
        define_brands_option(parser)
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
                  "Specify one or multiple (comma-separated) Instagram usernames to scrape " \
                  "(e.g. nike,adidas)") do |brands|
          @brands = brands.split(",")
        end
      end

      def define_min_likes_option(parser)
        parser.on("-l", "--min-likes [N]",
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
                  "(defaults to 'Desktop/instagram-data.csv')") do |output|
          @output = "#{Dir.home}/#{output}"
        end
      end

      def define_help_option(parser)
        parser.on_tail("-h", "--help", "Show this help message") do
          @logger.log_message(parser)
          exit
        end
      end

      def define_version_option(parser)
        parser.on_tail("-v", "--version", "Print the current version") do
          @logger.log_message(InstagramScraper::VERSION)
          exit
        end
      end
    end

    def parse(args)
      @options = ScriptOptions.new
      OptionParser.new do |parser|
        @options.define_options(parser)
        parse_options(parser, args)
      end
      @options
    end

    private

    def parse_options(parser, args)
      parser.parse!(args)
      validate_output(@options.output) unless args.empty?
      raise OptionParser::MissingArgument, "brands" unless @options.brands
    rescue OptionParser::ParseError => e
      @options.logger.log_error_message(e)
      @options.logger.log_message("")
      @options.logger.log_message(parser)
      exit
    end

    def validate_output(output)
      output_dir = output.rpartition("/")[0]
      if File.exist?(output)
        @options.logger.log_error_message("#{output} already exists")
        exit
      elsif !File.directory?(output_dir)
        @options.logger.log_error_message("#{output_dir} is not a valid directory")
        exit
      end
    end
  end
end
