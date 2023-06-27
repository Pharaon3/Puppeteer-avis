const puppeteer = require('puppeteer');

(async () => {
    const proxyServer = '185.123.147.15:12323@14ada18da7d2d:7e1fc9d6f5';
  // Launch a headless browser
  const browser = await puppeteer.launch({
    args: [`--proxy-server=${proxyServer}`]
  });

  // Create a new page
  const page = await browser.newPage();

  // Navigate to a website
  await page.goto('https://www.example.com');

  // Get the IP address of the current page
  const ipAddress = await page.evaluate(() => {
    return fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => data.ip);
  });

  // Print the IP address
  console.log('IP Address:', ipAddress);

  // Close the browser
  await browser.close();
})();
