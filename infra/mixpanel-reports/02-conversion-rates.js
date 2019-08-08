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
      [
        "Loaded Plugin",
        "Toggled Plugin",
        "Visited Page",
        "Purchase Success"
      ].includes(event.name)
    )
    .groupByUser((acc, events) => {
      acc = acc || {
        hostname: null,
        loadedPlugin: false,
        toggledPlugin: false,
        visitedPage: false,
        loadedPluginCount: 0,
        toggledPluginCount: 0,
        visitedPageCount: 0,
        pluginPurchaseCount: 0,
        visitedPagePurchaseCount: 0
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Loaded Plugin" && !acc.loadedPlugin) {
          acc.hostname = events[i].properties.hostname;
          acc.loadedPlugin = true;
          acc.loadedPluginCount += 1;
        } else if (
          events[i].name === "Toggled Plugin" &&
          events[i].properties.action === "open" &&
          acc.loadedPlugin &&
          !acc.toggledPlugin
        ) {
          acc.toggledPlugin = true;
          acc.toggledPluginCount += 1;
          if (acc.visitedPage) {
            acc.visitedPage = false;
            acc.visitedPageCount -= 1;
          }
        } else if (
          events[i].name === "Visited Page" &&
          acc.loadedPlugin &&
          !acc.toggledPlugin &&
          !acc.visitedPage
        ) {
          acc.visitedPage = true;
          acc.visitedPageCount += 1;
        } else if (
          events[i].name === "Purchase Success" &&
          acc.loadedPlugin &&
          !acc.purchaseSuccess
        ) {
          if (acc.toggledPlugin || acc.visitedPage) {
            acc.purchaseSuccess = true;
          }

          if (acc.toggledPlugin) {
            acc.pluginPurchaseCount += 1;
          } else if (acc.visitedPage) {
            acc.visitedPagePurchaseCount += 1;
          }
        }
      }
      return acc;
    })
    .filter(entry => entry.value.loadedPluginCount > 0)
    .groupBy(
      ["value.hostname"],
      [
        mixpanel.reducer.sum("value.loadedPluginCount"),
        mixpanel.reducer.sum("value.toggledPluginCount"),
        mixpanel.reducer.sum("value.visitedPageCount"),
        mixpanel.reducer.sum("value.pluginPurchaseCount"),
        mixpanel.reducer.sum("value.visitedPagePurchaseCount")
      ]
    )
    .filter(entry => entry.value[3] > 0 || entry.value[4] > 0)
    .map(entry => ({
      _1_hostname: entry.key[0],
      _2_loadedPluginCount: entry.value[0],
      _3_toggledPluginCount: entry.value[1],
      _4_toggledPluginPurchases: entry.value[3],
      _5_secondPageCount: entry.value[2],
      _6_secondPagePurchases: entry.value[4]
    }));
}
