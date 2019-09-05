module Jql
  class Scripts
    def self.conversion_rate
      File.read(File.join(File.dirname(__FILE__), "conversion_rate.js"))
    end

    def self.conversion_rate_dummy(params)
      date_range(params).map do |date|
        {
          date: date.to_s,
          conversionRate: rand(0.03..0.25),
        }
      end
    end

    def self.avg_cart_value
      File.read(File.join(File.dirname(__FILE__), "avg_cart_value.js"))
    end

    def self.avg_cart_value_dummy(params)
      date_range(params).map do |date|
        {
          date: date.to_s,
          currency: "EUR",
          withoutPluginTotal: rand(50..400),
          withPluginTotal: rand(250..550),
        }
      end
    end

    def self.most_interacted_modules
      File.read(File.join(File.dirname(__FILE__), "most_interacted_modules.js"))
    end

    def self.most_interacted_modules_dummy(params)
      modules_array = most_interacted_modules_dummy_records.map do |record|
        most_interacted_modules_dummy_params(record)
      end
      modules_array.sort do |x, y|
        y[params[:sort].to_sym] <=> x[params[:sort].to_sym]
      end
    end

    def self.most_interacted_modules_dummy_records
      showcases = Showcase.first(3)
      simple_chats = SimpleChat.first(3)
      (simple_chats + showcases).shuffle
    end

    def self.most_interacted_modules_dummy_params(record)
      loaded_count = rand(900..3000)
      toggled_count = rand(100..800)
      {
        flowType: record.class.name.camelize(:lower),
        flowId: record.id,
        loadedCount: loaded_count,
        toggledCount: toggled_count,
        conversion: (toggled_count / loaded_count).to_f,
      }
    end

    def self.date_range(params)
      (Date.parse(params[:dates][:from_date])..Date.parse(params[:dates][:to_date])).step(7)
    end

    def self.revenues
      File.read(File.join(File.dirname(__FILE__), "revenues.js"))
    end

    def self.revenues_dummy(_params)
      tokens = Affiliation.pluck(:token)
      revenues = {}
      tokens.each do |token|
        revenues[token] = {}
        currencies = %w[EUR USD GBP].sample(2)
        currencies.each { |currency| revenues[token][currency] = rand(100..800) }
        revenues[token]["PTT"] = 1000
      end
      [revenues]
    end
  end
end
