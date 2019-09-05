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
        currencies: [],
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Proceed To Checkout") {
            acc.latestProceedToCheckoutIndex = i
        } else if (events[i].name === "Purchase Success") {
          if (acc.latestProceedToCheckoutIndex !== null) {
            if (!acc[events[acc.latestProceedToCheckoutIndex].properties.currency]) {
              acc.currencies.push(events[acc.latestProceedToCheckoutIndex].properties.currency)
              acc[events[acc.latestProceedToCheckoutIndex].properties.currency] = {amount: events[acc.latestProceedToCheckoutIndex].properties.subTotalInCents / 100}
            } else {
              acc[events[acc.latestProceedToCheckoutIndex].properties.currency].amount += events[acc.latestProceedToCheckoutIndex].properties.subTotalInCents / 100
            }
            acc.latestProceedToCheckoutIndex = null
          }
        }
      }
      return acc;
    })
    .filter(entry => entry.value.currencies.length > 0)
    .reduce((accumulators, items) => {
      let result = {};
      for (let i = 0; i < accumulators.length; i++) {
        Object.keys(accumulators[i]).forEach((token) => {
            if (!result[token]) result[token] = {}
            Object.keys(accumulators[i][token]).forEach((currency) => {
              if (!result[token][currency]) result[token][currency] = 0
              result[token][currency] += accumulators[i][token][currency]
            })
        });
      }
      for (let j = 0; j < items.length; j++) {
        let item = items[j]
        let token = item.key[1]
        for (let m = 0; m < item.value.currencies.length; m++) {
          let currency = item.value.currencies[m]
          if (!result[token]) result[token] = {}
          if (!result[token][currency]) result[token][currency] = 0
          result[token][currency] += item.value[currency].amount
        }
      }
      return result;
    })
}

function getAffiliateToken(event) {
  return event.properties.affiliateToken;
}
