require "open-uri"

module InstagramScraper
  class HTTPProxy
    def initialize
      @proxies = URI.open(ENV["PROXIES_URL"]).read.split(/\r\n/).map { |proxy| "http://#{proxy}" }
      @proxy_index = -1
    end

    def open(uri)
      URI.open(uri)
    rescue StandardError => e
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
      rescue StandardError => e
        handle_network_error(uri, e)
      end
    end

    def handle_network_error(uri, error)
      raise error if error.class == OpenURI::HTTPError && error.io.status.first == "404"

      @proxy_index += 1
      open_with_proxy(uri)
    end
  end
end
