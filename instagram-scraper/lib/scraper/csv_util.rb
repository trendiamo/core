require "csv"

module InstagramScraper
  class CSVUtil
    class << self
      def store_posts_in_csv(file_path, posts)
        CSV.open(file_path, "a+", headers: true) do |csv|
          write_posts_in_csv(csv, posts)
        end
      end

      def generate_csv_from_posts(posts)
        CSV.generate(headers: true) do |csv|
          write_posts_in_csv(csv, posts)
        end
      end

      private

      def write_posts_in_csv(csv, posts)
        csv << posts.first.keys.map { |key| key.to_s.tr("_", " ").capitalize } if csv.count.zero?
        posts.each { |post| csv << post.values }
      end
    end
  end
end
