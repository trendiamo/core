module Mixpanel
  class Scripts
    def self.conversion_rate
      File.read(File.join(File.dirname(__FILE__), "conversion_rate.js"))
    end

    def self.conversion_rate_dummy(params)
      date_range(params).map do |date|
        {
          date: date.to_s,
          conversionRate: rand < 0.3 ? 0 : rand(0.03..0.25),
        }
      end
    end

    def self.avg_cart_value
      File.read(File.join(File.dirname(__FILE__), "avg_cart_value.js"))
    end

    def self.avg_cart_value_dummy(params)
      chain = date_range(params).map do |date|
        {
          date: date.to_s,
          currency: "EUR",
          withoutPluginTotal: rand(50..400),
        }.merge(rand < 0.4 ? { withPluginTotal: rand(50..500) } : {})
      end
      chain.map { |e| !e[:withPluginTotal] ? nil : e }.filter { |e| e }
    end

    def self.date_range(params)
      date_threshold(Date.parse(params[:dates][:from_date]))..date_threshold(Date.parse(params[:dates][:to_date]))
    end

    def self.date_threshold(date)
      DateTime.current.to_date < date ? DateTime.current.to_date.to_s : date.to_s
    end
  end
end
