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
        countWithPlugin: 0,
        countWithoutPlugin: 0,
        amountWithPlugin: 0,
        amountWithoutPlugin: 0,
        currency: "EUR",
        draftAmount: 0,
        time: null,
        toggledPlugin: false,
        proceedToCheckout: false
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Toggled Plugin") {
          acc.toggledPlugin = true;
          if (!acc.time) acc.time = events[i].time;
        } else if (events[i].name === "Proceed To Checkout") {
          acc.proceedToCheckout = true;
          acc.currency = events[i].properties.currency;
          acc.draftAmount = Math.round(
            events[i].properties.subTotalInCents / 100
          );
        } else if (events[i].name === "Purchase Success") {
          if (acc.proceedToCheckout) {
            if (acc.toggledPlugin) {
              acc.amountWithPlugin += acc.draftAmount;
              acc.countWithPlugin += 1;
            } else {
              acc.amountWithoutPlugin += acc.draftAmount;
              acc.countWithoutPlugin += 1;
            }
            acc.draftAmount = 0;
            acc.toggledPlugin = false;
            acc.proceedToCheckout = false;
            if (!acc.time) acc.time = events[i].time;
          }
        }
      }
      return acc;
    })
    .groupBy(
      [entry => getWeekOfYear(new Date(entry.value.time)), "value.currency"],
      [
        mixpanel.reducer.min("value.time"),
        mixpanel.reducer.sum("value.countWithPlugin"),
        mixpanel.reducer.sum("value.amountWithPlugin"),
        mixpanel.reducer.sum("value.countWithoutPlugin"),
        mixpanel.reducer.sum("value.amountWithoutPlugin")
      ]
    )
    .map(entry => ({
      date: formatDate(new Date(entry.value[0])),
      currency: entry.key[1],
      withPluginTotal: entry.value[2] / entry.value[1],
      withoutPluginTotal: entry.value[4] / entry.value[3]
    }))
    .filter(r => r.withPluginTotal > 0);
}
