module Mixpanel
  class Scripts
    def self.conversion_rate
      <<~JS
        const formatDate = a => new Date(a).toISOString().replace(/T.*/, "");
        function main() {
          return Events(params.dates)
            .filter(a => a.properties.hostname === params.hostname)
            .filter(a => ["Toggled Plugin", "Proceed To Checkout"].includes(a.name))
            .groupByUser((a, b) => {
              const c = b.find(a => "Proceed To Checkout" === a.name);
              let d = {
                startDate: formatDate(new Date(b[0].time)),
                converted: !!c,
                conversionDate: c && formatDate(new Date(c.time))
              };
              return d;
            })
            .groupBy(
              ["value.startDate"],
              [
                mixpanel.reducer.sum(a => (a.value.converted ? 1 : 0)),
                mixpanel.reducer.count()
              ]
            )
            .map(a => ({ date: a.key[0], conversionRate: a.value[0] / a.value[1] }));
        }
      JS
    end
  end
end
