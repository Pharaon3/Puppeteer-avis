const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch({headless:false});

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
  // Array to store network requests with headers
  const networkResponses = [];

  // Listen for network request events
  page.on('response', (response) => {
    networkResponses.push({
    //   url: request.url(),
      headers: response.headers()
    });
    // response.continue();
  });

  // Navigate to a website
  await page.goto('https://www.avis.com/en/home');

  const inputBox = await page.$x('//*[@id="PicLoc_value"]');

  // Fill the input box
  await inputBox[0].type("BHM");

  const button = await page.$x('//*[@id="res-home-select-car"]');

  // Fill the input box
  await button[0].click();
  // Perform interactions or further navigation as needed
  // ...

  // Print the captured network requests with headers
  let cookie = '';
  let digitoken = '';
  networkRequests.forEach(request => {
    // console.log('URL:', request.url);
    // console.log('Headers:', request.headers);
    // console.log('---------------------------');
    if (request.headers["digital-token"]) {
        digitoken = request.headers["digital-token"];
        cookie = request.headers["cookie"];
    }
  });

  console.log("cookie: ", cookie);
  console.log("digitoken: ", digitoken);

//   const jsonData = JSON.stringify({"data": networkRequests}, null, 2);
//   fs.writeFile('data.txt', jsonData, 'utf8', (err) => {
//     if (err) {
//       console.error('Error writing file:', err);
//     } else {
//       console.log('Data exported to data.txt successfully.');
//     }
//   });
  // Close the browser
  await browser.close();






  // 
let data = JSON.stringify({
  "rqHeader": {
    "brand": "",
    "locale": "en_US"
  },
  "nonUSShop": true,
  "pickInfo": "BHM",
  "pickDate": "07/10/2023",
  "pickTime": "12:00 PM",
  "dropInfo": "BHM",
  "dropDate": "07/11/2023",
  "dropTime": "12:00 PM",
  "couponNumber": "",
  "couponInstances": "",
  "couponRateCode": "",
  "discountNumber": "",
  "rateType": "",
  "residency": "US",
  "age": 25,
  "wizardNumber": "",
  "lastName": "",
  "userSelectedCurrency": "",
  "selDiscountNum": "",
  "promotionalCoupon": "",
  "preferredCarClass": "",
  "membershipId": "",
  "noMembershipAvailable": false,
  "corporateBookingType": "",
  "enableStrikethrough": "true",
  "amazonGCPayLaterPercentageVal": "",
  "amazonGCPayNowPercentageVal": "",
  "corporateEmailID": ""
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://www.avis.com/webapi/reservation/vehicles',
  headers: { 
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Encoding': 'gzip, deflate, br', 
    'Accept-Language': 'en-US,en;q=0.9', 
    'Bookingtype': 'car', 
    'Channel': 'Digital', 
    'Content-Length': '621', 
    'Content-Type': 'application/json', 
    'Cookie': cookie, 
    'Devicetype': 'bigbrowser', 
    'Digital-Token': digitoken, 
    'Domain': 'us', 
    'Initreservation': 'true', 
    'Locale': 'en', 
    'Origin': 'https://www.avis.com', 
    'Password': 'AVISCOM', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 
    'Username': 'AVISCOM', 
    'Referer': 'https://www.avis.com/en/home', 
    'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
    'Sec-Ch-Ua-Mobile': '?0', 
    'Sec-Ch-Ua-Platform': '"Windows"', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'same-origin'
  },
  data : data
};
let responseData;
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  responseData = JSON.stringify(response.data);
})
.catch((error) => {
  console.log(error);
});

//   const jsonData = JSON.stringify({"data": networkRequests}, null, 2);
  fs.writeFile('data.txt', responseData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Data exported to data.txt successfully.');
    }
  });

})();
