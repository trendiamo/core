if ENV["SPARKPOST_API_KEY"]
  SparkPostRails.configure do |c|
    c.api_endpoint = "https://api.eu.sparkpost.com/api/v1/transmissions"
    c.api_key = ENV["SPARKPOST_API_KEY"]
  end
end
