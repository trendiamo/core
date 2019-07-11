const formatDate = d => new Date(d).toISOString().replace(/T.*/, "");
function main() {
  return Events(params.dates)
    .filter(event => event.properties.hostname === params.hostname)
    .filter(event =>
      ["Toggled Plugin", "Proceed To Checkout", "Visited Page"].includes(
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
        date: null,
        toggledPlugin: false,
        proceedToCheckout: false
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Toggled Plugin") {
          acc.toggledPlugin = true;
          if (!acc.date) acc.date = formatDate(new Date(events[i].time));
        } else if (events[i].name === "Proceed To Checkout") {
          acc.proceedToCheckout = true;
          acc.currency = events[i].properties.currency;
          acc.draftAmount = Math.round(
            events[i].properties.subTotalInCents / 100
          );
        } else if (
          /* TODO: use Purchase Success event instead when it's available */
          events[i].name === "Visited Page" &&
          (([
            "www.pierre-cardin.de",
            "www.impressorajato.com.br",
            "www.baldessarini.com"
          ].includes(events[i].properties.hostname) &&
            events[i].properties.$current_url.includes(
              "/checkout/onepage/success/"
            )) ||
            (["pampling.com", "www.pampling.com"].includes(
              events[i].properties.hostname
            ) &&
              events[i].properties.$current_url.includes(
                "pedido-finalizado"
              )) ||
            (["www.pionier-workwear.com"].includes(
              events[i].properties.hostname
            ) &&
              events[i].properties.$current_url.includes(
                "formonline.shop.shoppingcart.checkout.overview"
              )) ||
            (["www.buttwrap.com"].includes(events[i].properties.hostname) &&
              events[i].properties.$current_url.includes("/thank_you")) ||
            (["tontonetfils.fr"].includes(events[i].properties.hostname) &&
              events[i].properties.$current_url.includes("9662595172")) ||
            (["timeblock-europe.com"].includes(events[i].properties.hostname) &&
              events[i].properties.$current_url.includes("order-received")) ||
            (["www.shopinfo.com.br"].includes(events[i].properties.hostname) &&
              events[i].properties.$current_url.includes("orderPlaced")))
          /* end TODO */
        ) {
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
            if (!acc.date) acc.date = formatDate(new Date(events[i].time));
          }
        }
      }
      return acc;
    })
    .groupBy(
      ["value.date", "value.currency"],
      [
        mixpanel.reducer.sum("value.countWithPlugin"),
        mixpanel.reducer.sum("value.amountWithPlugin"),
        mixpanel.reducer.sum("value.countWithoutPlugin"),
        mixpanel.reducer.sum("value.amountWithoutPlugin")
      ]
    )
    .map(entry => ({
      date: entry.key[0],
      currency: entry.key[1],
      withPluginTotal: entry.value[1] / entry.value[0],
      withoutPluginTotal: entry.value[3] / entry.value[2]
    }))
    .filter(r => r.withPluginTotal > 0);
}
