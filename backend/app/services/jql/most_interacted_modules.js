function main() {
  return Events(params.dates)
    .filter(event => event.properties.hostname === params.hostname)
    .filter(event => ["Loaded Plugin", "Toggled Plugin"].includes(event.name))
    .filter(event =>
      event.name === "Toggled Plugin"
        ? event.properties.action === "open"
        : true
    )
    .filter(
      event =>
        ![
          "asmt-cart",
          "asmt-size-guide",
          "asmt-store",
          "ht-assessment",
          "ht-assessment-v2",
          "ht-assessment-form",
          "outro"
        ].includes(event.properties.flowType)
    )
    .filter(event => event.properties.flowType && event.properties.flowId)
    .groupByUser(
      ["properties.flowType", "properties.flowId"],
      (acc, events) => {
        acc = acc || { loadedCount: 0, toggledCount: 0 };
        for (let i = 0; i < events.length; ++i) {
          if (events[i].name === "Loaded Plugin") {
            acc.loadedCount = 1;
          } else if (events[i].name === "Toggled Plugin") {
            acc.toggledCount = 1;
          }
        }
        return acc;
      }
    )
    .groupBy(
      ["key.1", "key.2"],
      [
        mixpanel.reducer.sum("value.loadedCount"),
        mixpanel.reducer.sum("value.toggledCount")
      ]
    )
    .map(entry => ({
      flowType: entry.key[0],
      flowId: entry.key[1],
      loadedCount: entry.value[0],
      toggledCount: entry.value[1],
      conversion: entry.value[1] / entry.value[0]
    }))
    .sortDesc(params.sort);
}
