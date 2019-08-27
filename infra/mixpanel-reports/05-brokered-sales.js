const fromDate = "2018-01-01";
const toDate = "2019-08-26";
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
        cartValueWithPlugin: 0,
        productsCountWithPlugin: 0,

        countWithPluginConfirmed: 0,
        cartValueWithPluginConfirmed: 0,
        productsCountWithPluginConfirmed: 0,

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
          acc.toggledPlugin = true;
        } else if (
          events[i].name === "Proceed To Checkout" &&
          !acc.proceedToCheckout
        ) {
          acc.hostname = events[i].properties.hostname;
          acc.proceedToCheckout = true;
          acc.currency = events[i].properties.currency;

          if (acc.toggledPlugin) {
            acc.cartValueWithPlugin += Math.round(
              events[i].properties.subTotalInCents / 100
            );
            acc.productsCountWithPlugin +=
              Object.keys(events[i].properties.products).reduce(
                (r, k) =>
                  r +
                  +(
                    events[i].properties.products[k].quantity ||
                    events[i].properties.products[k].productQuantity
                  ),
                0
              ) || 1;
            acc.countWithPlugin += 1;
          }
        } else if (
          events[i].name === "Purchase Success" &&
          acc.proceedToCheckout
        ) {
          acc.toggledPlugin = false;
          acc.proceedToCheckout = false;

          acc.cartValueWithPluginConfirmed += acc.cartValueWithPlugin;
          acc.productsCountWithPluginConfirmed += acc.productsCountWithPlugin;
          acc.countWithPluginConfirmed += acc.countWithPlugin;
        }
      }
      return acc;
    })
    .groupBy(
      ["value.hostname", "value.currency"],
      [
        mixpanel.reducer.sum("value.countWithPluginConfirmed"),
        mixpanel.reducer.sum("value.cartValueWithPluginConfirmed"),
        mixpanel.reducer.sum("value.productsCountWithPluginConfirmed")
      ]
    );
}
