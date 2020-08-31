// Items to download
downloadItems = [
  /*
  {
    name: "Example Item",
    url:"https://www.example.com",
    steps = async function() {
      
      await navigationStep1;
      await navigationStep2;
      ...
      await downloadTrigger;
      
      see https://playwright.dev/#?path=docs/api.md
      to learn about the steps u can use here 
    }
  },
  */

  {
    name: "Indian Express",
    url: "https://dailyepaper.in/indian-express-epaper/",
    steps: async function (page) {
      const handle = await page.$('#post-810 > div > p:nth-child(22) > span > a');
      const link = await handle.getAttribute("href");
      await page.goto(link);
      await page.evaluate(() => saveDoc());
    },
  },

  {
    name: "Financial Express",
    url: "https://pdf.indianexpress.com/icici/ie/hyderabad/",
    steps: async function (page) {
      await page.click("#load-content > div > div > div > a > img");
    },
  },
];

module.exports = downloadItems;
