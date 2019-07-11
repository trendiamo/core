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
        date: null,
        draftTotal: 0,
        total: 0,
        withPlugin: false
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Toggled Plugin") {
          if (!acc.date) acc.withPlugin = true;
        } else if (events[i].name === "Proceed To Checkout") {
          acc.draftTotal = 1;
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
          acc.total = acc.draftTotal;
          acc.draftTotal = 0;
          acc.date = formatDate(new Date(events[i].time));
        }
      }
      return acc;
    })
    .filter(entry => entry.value.date)
    .groupBy(
      ["value.date", "value.withPlugin"],
      mixpanel.reducer.sum("value.total")
    )
    .groupBy(["key.0"], (accs, entries) => {
      const acc = { withPluginTotal: 0, withoutPluginTotal: 0 };
      for (let i = 0; i < entries.length; ++i) {
        const withPlugin = entries[i].key[1];
        if (withPlugin) {
          acc.withPluginTotal += entries[i].value;
        } else {
          acc.withoutPluginTotal += entries[i].value;
        }
      }
      for (let i = 0; i < accs.length; ++i) {
        acc.withPluginTotal += accs[i].withPluginTotal;
        acc.withoutPluginTotal += accs[i].withoutPluginTotal;
      }
      return acc;
    })
    .map(entry => ({
      date: entry.key[0],
      conversionRate:
        entry.value.withPluginTotal / entry.value.withoutPluginTotal
    }));
}