function main() {
  return Events(params.dates)
    .filter(event => params.affiliateTokens.includes(event.properties.affiliateToken))
    .filter(event =>
      ["Proceed To Checkout", "Purchase Success"].includes(
        event.name
      )
    )
    .groupByUser([getAffiliateToken],(acc, events) => {
      acc = acc || {
        latestProceedToCheckoutIndex: null,
        orders: [],
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Proceed To Checkout") {
            acc.latestProceedToCheckoutIndex = i
        } else if (events[i].name === "Purchase Success") {
          if (acc.latestProceedToCheckoutIndex !== null) {
            let newOrder = {
              currency: events[acc.latestProceedToCheckoutIndex].properties.currency,
              amountInCents: events[acc.latestProceedToCheckoutIndex].properties.subTotalInCents,
              products: events[acc.latestProceedToCheckoutIndex].properties.products,
            }
            acc.orders.push(newOrder)
            acc.latestProceedToCheckoutIndex = null
          }
        }
      }
      return acc;
    })
    .reduce((accumulators, items) => {
      let result = {};
      for (let i = 0; i < accumulators.length; i++) {
        Object.keys(accumulators[i]).forEach((token) => {
            if (!result[token]) {
              result[token] = {orders: accumulators[i][token].orders}
            } else {
              result[token].orders = result[token].orders.concat(accumulators[i][token].orders)
            }
        });
      }
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        let token = item.key[1]
        for (let m = 0; m < item.value.orders.length; m++) {
          if (!result[token]) result[token] = {orders: []}
          result[token].orders.push(item.value.orders[m])
        }
      }
      return result;
    })
}

function getAffiliateToken(event) {
  return event.properties.affiliateToken;
}
