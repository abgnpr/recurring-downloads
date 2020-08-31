const fs = require("fs");
const yaml = require("js-yaml");
const { chromium } = require("playwright-chromium");

// load browser configuration
const { userDataDir, launchOptions, downloadsPath } = yaml.safeLoad(
  fs.readFileSync("./config.yaml", "utf-8")
);

// load the downloader function
const download = require("./download");

// load the info needed to download the items
const downloadItems = require("./downloadItems");

chromium // launch browser
  .launchPersistentContext(userDataDir, launchOptions)
  .then(async browser => {
    
    // enqueue downloads
    let downloads = [];
    for (let item of downloadItems) {
      let page = await browser.newPage(); // new tab for each newspaper
      downloads.push(
        // promise a download                 v--- toggle to see errors
        download(item, page, downloadsPath, false)
          .then(console.log)  // logs success
          .catch(console.log) // logs failure
      );
    }

    // wait for all downloads to finish / fail
    await Promise.allSettled(downloads);
    
    // close the browser
    await browser.close();
  
  }).catch(console.log).finally(() => console.log('\n'))
