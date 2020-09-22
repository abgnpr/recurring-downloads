# Recurring Downloads

Automate recurring batch downloads.

## What is it?

A neat wrapper around the Playwright download API that manages parallel downloads and error handling for you.

## Use case

Ideal for cases where you constantly download fresh copies from a regularly updating source.

For example, I use it to download my daily newspapers.

## Working

1. You specify items to be downloaded, and how to trigger their download.

2. You issue a single command to start the downloads.

3. You are informed as soon as each of your downloads finish or fail.

Note: You can automate step 2 as well using a tool like cron or a one-shot system service.

## Installation

- Linux/mac-OS

  ```bash
  git clone https://github.com/mountAP/recurring-downloads.git
  cd recurring-downloads
  PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install
  ```

- Windows

  ```cmd
  git clone https://github.com/mountAP/recurring-downloads.git
  cd recurring-downloads
  set PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
  npm install
  ```

## Configuration

Open `config.yaml` and set the appropriate values of `1, 2 & 3` for your system and save.

Paths must be absolute. Quote your path strings.

```yaml
--- # launch configuration

# directory to store browser session data
# like cookies and local storage
userDataDir: <1>
# Some temporary directory is preferred;
# we don't need to store session data

# folder to keep your downloads
downloadsPath: <2>

# browser launch configuration
launchOptions:
  # absolute path to your chrome or chromium executable
  executablePath: <3>

  # whether to enable downloads from websites
  acceptDownloads: true

  # whether to run the browser in headless mode
  headless: true

  # user locale, affects date formatting rules
  locale: en-GB
```

You can set `headless` to `false` if you want to see what your browser is doing. Useful for debugging.

## How to use

Prerequisite : Some familiarity with [Playwright](https://playwright.dev/)

### Specifying downloads and steps

```js
{
  name: "Example Item",
  url:"https://www.example.com",

  steps: async function() {
    await navigationStep1;
    await navigationStep2;
    // ...
    await downloadTrigger; // some event like a button click
  }
}
```

- Open `downloadItems.js`
- Create a new object inside `downloadItems[]`.
- Specify a `name` for your download file, and the starting `url` from where you'll ultimately reach your download. Choose the URL as close as possible to your download link.
- Consider yourself lucky if you have direct download links, but on today's dynamic websites that's hardly the case.
- So we'll use some Playwright code to navigate to our download like a real user would, but through code.
- This is the tricky part.
  - You'll have to experiment with [Playwright API](https://playwright.dev/#version=v1.3.0&path=docs%2Fapi.md&q=) to determine the set of commands that'll trigger your download.
  - Every web-page is different, and so are the steps for downloading files from each of them.
  - Figure out the elements, selectors and events that you can exploit to reach your download and trigger it.
- Once you've figured that out, throw those codes inside the async function named `step`.
- Save the file.

You can specify multiple download items in `downloadItems.js`.

### Starting downloads

```bash
npm run download
```

```bash
node main.js
```

This command performs the steps and begins downloads.

Downloads take place in parallel.

Reports as soon as each download finishes or fails.

## Benefit?

Saves you from dealing with promises and error handling!
