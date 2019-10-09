const getWeekOfYear = d => {
  const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
  return Math.floor(
    ((d - firstDayOfYear) / 86400000 + firstDayOfYear.getDay() - 1) / 7
  );
};
const formatDate = d => new Date(d).toISOString().replace(/T.*/, "");
function main() {
  return Events(params.dates)
    .filter(event => event.properties.hostname === params.hostname)
    .filter(event =>
      ["Toggled Plugin", "Proceed To Checkout", "Purchase Success"].includes(
        event.name
      )
    )
    .groupByUser((acc, events) => {
      acc = acc || {
        time: null,
        toggledPlugin: false,
        proceedToCheckout: false,
        counts: 0,
        conversions: 0
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Toggled Plugin") {
          acc.toggledPlugin = true;
          acc.counts = 1;
          if (!acc.time) acc.time = events[i].time;
        } else if (events[i].name === "Proceed To Checkout") {
          acc.proceedToCheckout = true;
        } else if (events[i].name === "Purchase Success") {
          if (acc.toggledPlugin && acc.proceedToCheckout) {
            acc.conversions += 1;
            acc.toggledPlugin = false;
            acc.proceedToCheckout = false;
          }
        }
      }
      return acc;
    })
    .filter(entry => entry.value.time)
    .groupBy(
      [entry => getWeekOfYear(new Date(entry.value.time))],
      [
        mixpanel.reducer.min("value.time"),
        mixpanel.reducer.sum("value.conversions"),
        mixpanel.reducer.sum("value.counts")
      ]
    )
    .map(entry => ({
      date: formatDate(new Date(entry.value[0])),
      conversionRate: entry.value[1] / entry.value[2]
    }));
}
