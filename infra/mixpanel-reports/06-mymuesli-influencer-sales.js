const fromDate = "2019-08-01";
const d = new Date();
d.setDate(d.getDate() - 1);
const toDate = d.toISOString().split("T")[0];
const dates = { from_date: fromDate, to_date: toDate };
const params = { dates };

const formatDate = d => new Date(d).toISOString().replace(/T.*/, "");

const landingUrls = [
  "https://www.mymuesli.com/mm2go-jmblog",
  "https://www.mymuesli.com/mm2go-bergherz",
  "https://www.mymuesli.com/mm2go-cindydess",
  "https://www.mymuesli.com/mm2go-blessmysoul",
  "https://www.mymuesli.com/mm2go-coffeeandblush",
  "https://www.mymuesli.com/mm2go-powerfulplant",
  "https://www.mymuesli.com/mm2go-cfterri",
  "https://www.mymuesli.com/vegan-powerfulplant",
  "https://www.mymuesli.com/mm2go-susanne.schoene",
  "https://www.mymuesli.com/mm2go-elias",
  "https://www.mymuesli.com/mm2go-marnifaktur",
  "https://www.mymuesli.com/mm2go-jennimelzer",
  "https://www.mymuesli.com/mm2go-jjtigerminka",
  "https://www.mymuesli.com/mm2go-alicia9",
  "https://www.mymuesli.com/mm2go-mamawahnsinn",
  "https://www.mymuesli.com/mm2go-mothersfinest",
  "https://www.mymuesli.com/mm2go-kkkeiki"
];

function main() {
  return Events(params.dates)
    .filter(event => ["Visited Page", "Purchase Success"].includes(event.name))
    .filter(event => event.properties.hostname === "www.mymuesli.com")
    .groupByUser((acc, events) => {
      acc = acc || {
        startingUrl: null,
        visitedPage: false,
        purchaseSuccess: false,
        visitCount: 0,
        purchaseCount: 0
      };
      for (let i = 0; i < events.length; ++i) {
        if (
          events[i].name === "Visited Page" &&
          landingUrls.includes(events[i].properties.$current_url)
        ) {
          if (!acc.startingUrl) acc.startingUrl = events[i].properties.$current_url;
          acc.visitedPage = true;
          acc.visitCount += 1;
        } else if (events[i].name === "Purchase Success" && acc.visitedPage) {
          acc.purchaseCount += 1;
          acc.visitedPage = false;
        }
      }
      return acc;
    })
    .groupBy(
      ["value.startingUrl"],
      [
        mixpanel.reducer.sum("value.visitCount"),
        mixpanel.reducer.sum("value.purchaseCount")
      ]
    )
    .filter(e => e.key[0])
    .sortDesc(e => e.value[1])
    .map(entry => ({
      _1_initialUrl: entry.key[0].replace(/https:\/\/www\.mymuesli\.com/, ''),
      _2_visitCount: entry.value[0],
      _3_purchaseCount: entry.value[1],
    }));
}
