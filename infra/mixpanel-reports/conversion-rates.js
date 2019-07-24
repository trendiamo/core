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
        purchaseSuccess: false,
        pluginCount: 0,
        visitedPageCount: 0
      };
      for (let i = 0; i < events.length; ++i) {
        if (events[i].name === "Loaded Plugin") {
          acc.hostname = events[i].properties.hostname;
          acc.loadedPlugin = true;
        } else if (
          events[i].name === "Toggled Plugin" &&
          events[i].properties.action === "open" &&
          acc.loadedPlugin
        ) {
          acc.toggledPlugin = true;
        } else if (events[i].name === "Visited Page" && acc.loadedPlugin) {
          acc.visitedPage = true;
        } else if (events[i].name === "Purchase Success" && acc.loadedPlugin) {
          if (acc.toggledPlugin) {
            acc.pluginCount += 1;
          } else if (acc.visitedPage) {
            acc.visitedPageCount += 1;
          }
        }
      }
      return acc;
    })
    .filter(entry => entry.value.hostname)
    .groupBy(
      ["value.hostname"],
      [
        mixpanel.reducer.sum("value.pluginCount"),
        mixpanel.reducer.sum("value.visitedPageCount")
      ]
    )
    .filter(entry => entry.value[0] > 0 || entry.value[1] > 0)
    .map(entry => ({
      hostname: entry.key[0],
      pluginCount: entry.value[0],
      secondPageCount: entry.value[1]
    }));
}
