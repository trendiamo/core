class Mixpanel::FetchRevenues
  def self.perform
    new.perform
  end

  def initialize
    @dates = {
      from_date: Time.zone.yesterday.to_formatted_s(:iso8601),
      to_date: Time.zone.today.to_formatted_s(:iso8601),
    }
    @affiliate_tokens = Affiliation.all.pluck(:token)
  end

  def perform
    json = mixpanel_revenues
    return unless json

    revenues = json.keys.map do |token|
      affiliation = Affiliation.find_by(token: token)
      revenue_params(affiliation, json, token) if affiliation
    end
    Revenue.create!(revenues)
  end

  private

  def mixpanel_revenues
    result = ::Jql::RunQuery.new(mixpanel_revenues_params, "revenues").perform
    JSON.parse(result)[0]
  end

  def mixpanel_revenues_params
    {
      dates: @dates,
      affiliateTokens: @affiliate_tokens,
    }
  end

  def revenue_params(affiliation, json, token)
    {
      user: affiliation.user,
      account: affiliation.account,
      captured_at: Time.now.utc,
      values: json[token],
      commission_rate: affiliation.account.brand.commission_rate,
    }
  end
end
