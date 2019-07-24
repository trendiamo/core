const d = new Date();
d.setDate(d.getDate() - 1);
const toDate = d.toISOString().split("T")[0];
d.setDate(d.getDate() - 7);
const fromDate = d.toISOString().split("T")[0];
const dates = { from_date: fromDate, to_date: toDate };
const params = { dates };

const formatDate = d => new Date(d).toISOString().replace(/T.*/, "");

function main() {
  return Events(params.dates)
    .filter(event =>
      ["Toggled Plugin", "Proceed To Checkout", "Purchase Success"].includes(
        event.name
      )
    )
    .groupByUser((acc, events) => {
      acc = acc || {
        countWithPlugin: 0,
        countWithoutPlugin: 0,
        cartValueWithPlugin: 0,
        cartValueWithoutPlugin: 0,
        productsCountWithPlugin: 0,
        productsCountWithoutPlugin: 0,

        countWithPluginConfirmed: 0,
        countWithoutPluginConfirmed: 0,
        cartValueWithPluginConfirmed: 0,
        cartValueWithoutPluginConfirmed: 0,
        productsCountWithPluginConfirmed: 0,
        productsCountWithoutPluginConfirmed: 0,

        currency: "EUR",
        hostname: null,
        toggledPlugin: false,
        proceedToCheckout: false
      };
      for (let i = 0; i < events.length; ++i) {
        if (
          events[i].name === "Toggled Plugin" &&
          events[i].properties.action === "open"
        ) {
          acc.hostname = events[i].properties.hostname;
          acc.toggledPlugin = true;
        } else if (events[i].name === "Proceed To Checkout") {
          acc.proceedToCheckout = true;
          acc.currency = events[i].properties.currency;

          if (acc.toggledPlugin) {
            acc.cartValueWithPlugin += Math.round(
              events[i].properties.subTotalInCents / 100
            );
            acc.productsCountWithPlugin +=
              events[i].properties.products.length || 0;
            acc.countWithPlugin += 1;
          } else {
            acc.cartValueWithoutPlugin += Math.round(
              events[i].properties.subTotalInCents / 100
            );
            acc.productsCountWithoutPlugin +=
              events[i].properties.products.length || 0;
            acc.countWithoutPlugin += 1;
          }
        } else if (events[i].name === "Purchase Success") {
          if (!acc.proceedToCheckout) continue;

          acc.cartValueWithPluginConfirmed += acc.cartValueWithPlugin;
          acc.productsCountWithPluginConfirmed += acc.productsCountWithPlugin;
          acc.countWithPluginConfirmed += acc.countWithPlugin;
          acc.cartValueWithoutPluginConfirmed += acc.cartValueWithoutPlugin;
          acc.productsCountWithoutPluginConfirmed +=
            acc.productsCountWithoutPlugin;
          acc.countWithoutPluginConfirmed += acc.countWithoutPlugin;

          // TODO: should we reset?

          acc.toggledPlugin = false;
          acc.proceedToCheckout = false;
        }
      }
      return acc;
    })
    .groupBy(
      ["value.hostname", "value.currency"],
      [
        // mixpanel.reducer.sum("value.countWithoutPlugin"),
        // mixpanel.reducer.sum("value.cartValueWithoutPlugin"),
        // mixpanel.reducer.sum("value.productsCountWithoutPlugin"),
        // mixpanel.reducer.sum("value.countWithPlugin"),
        // mixpanel.reducer.sum("value.cartValueWithPlugin"),
        // mixpanel.reducer.sum("value.productsCountWithPlugin")
        mixpanel.reducer.sum("value.countWithoutPluginConfirmed"),
        mixpanel.reducer.sum("value.cartValueWithoutPluginConfirmed"),
        mixpanel.reducer.sum("value.productsCountWithoutPluginConfirmed"),
        mixpanel.reducer.sum("value.countWithPluginConfirmed"),
        mixpanel.reducer.sum("value.cartValueWithPluginConfirmed"),
        mixpanel.reducer.sum("value.productsCountWithPluginConfirmed")
      ]
    )
    .filter(entry => entry.key[0] && (entry.value[0] > 0 || entry.value[3] > 0))
    .map(entry => ({
      hostname: entry.key[0],
      currency: entry.key[1],
      avgCartValueWithoutPlugin: Math.round(entry.value[1] / entry.value[0]),
      avgCartValueWithPlugin: Math.round(entry.value[4] / entry.value[3]),
      avgItemPriceWithoutPlugin: Math.round(
        entry.value[1] / entry.value[0] / entry.value[2]
      ),
      avgItemPriceWithPlugin: Math.round(
        entry.value[4] / entry.value[3] / entry.value[5]
      )
    }));
}
