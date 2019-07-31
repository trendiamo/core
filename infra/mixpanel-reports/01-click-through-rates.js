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
      ["Loaded Plugin", "Toggled Plugin", "Purchase Success"].includes(
        event.name
      )
    )
    .groupByUser((acc, events) => {
      acc = acc || {
        hostname: null,
        loadedPlugin: false,
        toggledPlugin: false,
        purchaseSuccess: false,
        loadedPluginCount: 0,
        toggledPluginCount: 0,
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
          events[i].name === "Purchase Success" &&
          acc.loadedPlugin &&
          acc.toggledPlugin &&
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
        mixpanel.reducer.sum("value.purchaseSuccessCount")
      ]
    )
    .filter(entry => entry.value[2] > 0)
    .map(entry => ({
      _1_hostname: entry.key[0],
      _2_loadedPluginCount: entry.value[0],
      // _3_toggledPluginCR: parseFloat(entry.value[1] / entry.value[0]).toFixed(
      //   2
      // ),
      _3_toggledPluginCount: entry.value[1],
      // _5_purchaseSuccessCR: parseFloat(entry.value[2] / entry.value[0]).toFixed(
      //   2
      // ),
      _4_purchaseSuccessCount: entry.value[2]
    }));
}
