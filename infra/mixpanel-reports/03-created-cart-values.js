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
        countWithoutPlugin: 0,
        cartValueWithoutPlugin: 0,
        productsCountWithoutPlugin: 0,

        countWithPlugin: 0,
        cartValueWithPlugin: 0,
        productsCountWithPlugin: 0,

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
          } else {
            acc.cartValueWithoutPlugin += Math.round(
              events[i].properties.subTotalInCents / 100
            );
            acc.productsCountWithoutPlugin +=
              Object.keys(events[i].properties.products).reduce(
                (r, k) =>
                  r +
                  +(
                    events[i].properties.products[k].quantity ||
                    events[i].properties.products[k].productQuantity
                  ),
                0
              ) || 1;
            acc.countWithoutPlugin += 1;
          }
        }
      }
      return acc;
    })
    .groupBy(
      ["value.hostname", "value.currency"],
      [
        mixpanel.reducer.sum("value.countWithoutPlugin"),
        mixpanel.reducer.sum("value.cartValueWithoutPlugin"),
        mixpanel.reducer.sum("value.productsCountWithoutPlugin"),
        mixpanel.reducer.sum("value.countWithPlugin"),
        mixpanel.reducer.sum("value.cartValueWithPlugin"),
        mixpanel.reducer.sum("value.productsCountWithPlugin")
      ]
    )
    .filter(entry => entry.key[0] && (entry.value[0] > 0 || entry.value[3] > 0))
    .map(entry => ({
      _1_hostname: entry.key[0],
      _2_currency: entry.key[1],
      _3_purchaseWithoutPlugin: entry.value[0],
      _4_avgCartValueWithoutPlugin: Math.round(entry.value[1] / entry.value[0]),
      _5_avgItemPriceWithoutPlugin: Math.round(entry.value[1] / entry.value[2]),
      _6_purchaseWithPlugin: entry.value[3],
      _7_avgCartValueWithPlugin: Math.round(entry.value[4] / entry.value[3]),
      _8_avgItemPriceWithPlugin: Math.round(entry.value[4] / entry.value[5])
    }));
}
