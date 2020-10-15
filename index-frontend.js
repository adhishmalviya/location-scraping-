const request = require("request-promise");
const cheerio = require("cheerio");

const uri = "https://www.google.com/search?q=my+location+coordinates";

(async () => {
  const response = await request({
    uri: uri,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.5",
    },
    gzip: true,
  });
  let $ = cheerio.load(response);
  let location = $('div[class="BNeawe iBp4i AP7Wnd"]').text();

  lat = location.slice(0, 7).toString();
  lng = location.slice(12, 19).toString();
  if (location[9] != "N") {
    lat = "-" + lat;
  }
  if (location[21] != "E") {
    lng = "-" + lng;
  }
  coords = [lat, lng];
  console.log(coords);
})();
