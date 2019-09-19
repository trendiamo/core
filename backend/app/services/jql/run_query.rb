module Jql
  class RunQuery
    attr_reader :params, :script, :key
    JQL_HTTP_API_URL = "https://mixpanel.com/api/2.0/jql".freeze

    def initialize(params, script)
      @params = script == "orders" ? params : adjust_dates(params)
      @script = script
      @key = { params: @params, script: @script, version: "4" }.to_json
    end

    def perform
      result = compute_result
      if script == "most_interacted_modules" && !result.is_a?(RestClient::Exception)
        most_interacted_modules_complete(result).select { |item| item[:name] }
      else
        result
      end
    end

    private

    def compute_result
      unless ENV["MIXPANEL_API_KEY"] || ENV["MIXPANEL_API_KEY_TRACKER"]
        return Jql::Scripts.send("#{script}_dummy", params).to_json
      end

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
        item[:flowTypeTitle] = item[:flowType].upcase_first
        item[:active] = record.triggers.present?
      end
    end

    def most_interacted_modules_find_module(item)
      item[:flowType].classify.constantize.find_by(id: item[:flowId])
    end

    # adjust dates to stick to start of week, end of week, also never more recent than yesterday
    def adjust_dates(params)
      to_date = adjust_to_date(params[:dates][:to_date])
      from_date = adjust_from_date(params[:dates][:from_date], to_date)
      new_dates = { from_date: from_date.to_s, to_date: to_date.to_s }
      { dates: new_dates, hostname: params[:hostname], sort: params[:sort] }
    end

    def adjust_to_date(to_date)
      to_date = [Date.yesterday, Date.parse(to_date)].min
      to_date -= 7.days if to_date.at_end_of_week.month > to_date.month || to_date.at_end_of_week > Date.yesterday
      to_date.at_end_of_week
    end

    def adjust_from_date(from_date, to_date)
      [to_date - 1.day, Date.parse(from_date)].min.at_beginning_of_week
    end

    def perform_request
      RestClient::Request.execute(method: :get, url: JQL_HTTP_API_URL, headers: headers, payload: payload).to_s
    rescue RestClient::Exception => e
      e
    end

    def headers
      mixpanel_api_key = script == "orders" ? "#{ENV['MIXPANEL_API_KEY_TRACKER']}:" : "#{ENV['MIXPANEL_API_KEY']}:"
      { Authorization: "Basic " + Base64.encode64(mixpanel_api_key) }
    end

    def payload
      { params: params.to_json, script: Jql::Scripts.send(script) }
    end
  end
end
