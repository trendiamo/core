module Jql
  class RunQuery
    attr_reader :params, :script, :key
    JQL_HTTP_API_URL = "https://mixpanel.com/api/2.0/jql".freeze

    def initialize(params, script)
      @params = adjust_dates(params)
      @script = script
      @key = { params: @params, script: @script, version: "4" }.to_json
    end

    def perform
      result = compute_result
      if script == "most_interacted_modules"
        most_interacted_modules_complete(result).select { |item| item[:name] }
      else
        result
      end
    end

    private

    def compute_result
      return Jql::Scripts.send("#{script}_dummy", params).to_json unless ENV["MIXPANEL_API_KEY"]

      result = Rails.cache.read(key)
      unless result
        result = perform_request
        Rails.cache.write(key, result) unless result.is_a?(RestClient::Exception)
      end
      result
    end

    def most_interacted_modules_complete(result)
      JSON.parse(result).map(&:with_indifferent_access).each do |item|
        record = most_interacted_modules_find_module(item)
        next unless record

        item[:name] = record.name
        item[:flowTypeTitle] = item[:flowType].underscore.humanize.titleize
        item[:active] = record.triggers.present?
      end
    end

    def most_interacted_modules_find_module(item)
      item[:flowType].classify.constantize.find_by(id: item[:flowId])
    end

    # adjust dates to stick to start of week, end of week, also never more recent than yesterday
    def adjust_dates(params)
      new_dates = params[:dates]
      new_dates[:from_date] = Date.parse(new_dates[:from_date]).at_beginning_of_week.to_s
      new_dates[:to_date] = end_of_month_week(Date.parse(new_dates[:to_date])).at_beginning_of_week.to_s
      { dates: new_dates, hostname: params[:hostname], sort: params[:sort] }
    end

    def end_of_month_week(date)
      date = [Date.yesterday, date].min
      (date.at_end_of_week.month > date.month || date.at_end_of_week > Date.yesterday ? (date - 7.days) : date)
    end

    def perform_request
      RestClient::Request.execute(method: :get, url: JQL_HTTP_API_URL, headers: headers, payload: payload).to_s
    rescue RestClient::Exception => e
      e
    end

    def headers
      { Authorization: "Basic " + Base64.encode64("#{ENV['MIXPANEL_API_KEY']}:") }
    end

    def payload
      { params: params.to_json, script: Jql::Scripts.send(script) }
    end
  end
end
