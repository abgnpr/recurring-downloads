const fs = require('fs')
const chalk = require("chalk");

/** Returns today's day & date in dash separated format e.g Mon-Aug-31-2020 */
const dateStamp = () => new Date().toDateString().split(" ").join("-");

/** 
 * Navigates the given `page` to `downloadItem.url`, executes `downloadItem.steps()` and then waits 
 * for a download event. On successful download, it saves the download at `downloadsPath` with a
 * date stamp and returns a success message.
 * 
 * Timeout : 30 sec
 * 
 * @param { DownloadItem } downloadItem Object containing `name`, `url` and `steps()` for download.
 * @param { Page } page Object that interacts with a browser tab instance.
 * @param { string } downloadsPath Path to store the downloaded file.
 * @param { boolean } showErrorLogs Whether to show errors on rejections & failures.
 */
module.exports = async function download(
  downloadItem,
  page,
  downloadsPath,
  showErrorLogs = false
) {
  let downloadFile = `${downloadsPath}/${downloadItem.name.split(" ").join("")}_${dateStamp()}`;
  
  if (fs.existsSync(downloadFile))
    return chalk.blue("\nAlready exists: ") + downloadItem.name;

  console.log(chalk.yellow("\nDownloading: ") + downloadItem.name);
  try {
    await page.goto(downloadItem.url);
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadItem.steps(page), // `undefined` if all good
    ]);
    await download.path();
    await download.saveAs(downloadFile);
    return chalk.green("\nFinished: ") + downloadItem.name;
  
  } catch (err) {
    err = showErrorLogs ? "\n" + err : "";
    throw chalk.red("\nFailed: ") + downloadItem.name + err;
  }
};
