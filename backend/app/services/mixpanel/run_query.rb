module Mixpanel
  class RunQuery
    attr_reader :params, :script

    def initialize(params, script)
      @params = params
      @script = script
    end

    def perform
      RestClient::Request.execute(method: :get, url: "https://mixpanel.com/api/2.0/jql",
                                  headers: headers, payload: payload)
    end

    private

    def headers
      { Authorization: "Basic " + Base64.encode64("#{ENV['MIXPANEL_API_KEY']}:") }
    end

    def payload
      { params: @params, script: @script }
    end
  end
end
