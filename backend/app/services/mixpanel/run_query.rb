module Mixpanel
  class RunQuery
    attr_reader :params, :script, :key
    JQL_HTTP_API_URL = "https://mixpanel.com/api/2.0/jql".freeze

    def initialize(params, script)
      @params = params
      @script = script
      @key = { params: params, script: script }.to_json
    end

    def perform
      return Mixpanel::Scripts.send("#{script}_dummy", params) unless ENV["MIXPANEL_API_KEY"]

      result = Rails.cache.read(key)
      unless result
        result = perform_request
        Rails.cache.write(key, result) unless result.is_a?(RestClient::Exception)
      end
      result
    end

    private

    def perform_request
      RestClient::Request.execute(method: :get, url: JQL_HTTP_API_URL, headers: headers, payload: payload).to_s
    rescue RestClient::Exception => e
      e
    end

    def headers
      { Authorization: "Basic " + Base64.encode64("#{ENV['MIXPANEL_API_KEY']}:") }
    end

    def payload
      { params: params.to_json, script: Mixpanel::Scripts.send(script) }
    end
  end
end
