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
        "Interacted",
        "Purchase Success"
      ].includes(event.name)
    )
    .groupByUser((acc, events) => {
      acc = acc || {
        hostname: null,
        loadedPlugin: false,
        toggledPlugin: false,
        interacted: false,
        purchaseSuccess: false,
        loadedPluginCount: 0,
        toggledPluginCount: 0,
        interactedCount: 0,
        purchaseSuccessCount: 0
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
        } else if (
          events[i].name === "Interacted" &&
          acc.loadedPlugin &&
          acc.toggledPlugin &&
          !acc.interacted
        ) {
          acc.interacted = true;
          acc.interactedCount += 1;
        } else if (
          events[i].name === "Purchase Success" &&
          acc.loadedPlugin &&
          acc.toggledPlugin &&
          acc.interacted &&
          !acc.purchaseSuccess
        ) {
          acc.purchaseSuccess = true;
          acc.purchaseSuccessCount += 1;
        }
      }
      return acc;
    })
    .filter(entry => entry.value.loadedPlugin)
    .groupBy(
      ["value.hostname"],
      [
        mixpanel.reducer.sum("value.loadedPluginCount"),
        mixpanel.reducer.sum("value.toggledPluginCount"),
        mixpanel.reducer.sum("value.interactedCount"),
        mixpanel.reducer.sum("value.purchaseSuccessCount")
      ]
    )
    .filter(entry => entry.value[3] > 0)
    .map(entry => ({
      _1_hostname: entry.key[0],
      _2_loadedPluginCount: entry.value[0],
      _3_toggledPluginCount: entry.value[1],
      _4_interactedCount: entry.value[2],
      _5_purchaseSuccessCount: entry.value[3]
    }));
}
