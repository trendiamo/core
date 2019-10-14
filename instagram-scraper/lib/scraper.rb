require_relative "scraper/api"
require_relative "scraper/cli"
require_relative "scraper/client"

def scrape_brand_info(brand)
  client = InstagramScraper::Client.new
  client.scrape_brand_info(brand)
end

def scrape_brand_posts(brand, options = {})
  client = InstagramScraper::Client.new(options)
  brand_info = scrape_brand_info(brand)
  client.scrape_brand_posts(brand_info[:id])
end
