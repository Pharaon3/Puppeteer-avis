const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Enable request interception
  await page.setRequestInterception(true);

  // Array to store network requests with headers
  const networkRequests = [];

  // Listen for network request events
  page.on('request', (request) => {
    networkRequests.push({
    //   url: request.url(),
      headers: request.headers()
    });
    request.continue();
  });

  // Navigate to a website
  await page.goto('https://avis.com');

  // Perform interactions or further navigation as needed
  // ...

  // Print the captured network requests with headers
  networkRequests.forEach(request => {
    // console.log('URL:', request.url);
    console.log('Headers:', request.headers);
    console.log('---------------------------');
  });

  // Close the browser
  await browser.close();
})();
