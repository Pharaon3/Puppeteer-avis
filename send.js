const axios = require('axios');
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
    'Cookie': 'datacenter=cdal; visitorId=cdal-A22b8533e-cfe5-463a-9d4a-f2599488284d; APISID=2237ace2-c075-4eda-8cc0-3be66831a990; digital-token=45da608e-9dda-4685-8635-d339ceaee45f-02-cdal-ho3557; region=euwest1; optimizelyEndUserId=oeu1687545524307r0.5478688124166426; akaalb_production_config=~op=avis_euwest1_webapi_private_lbid:avis-webapi-euwest1-aws|avis_com:avis-us-digital-euwest1-aws|~rv=45~m=avis-webapi-euwest1-aws:0|avis-us-digital-euwest1-aws:0|~os=7f956ca2417c5e686d715889b6a30f65~id=b8bb73157583be84615e5c7c643f3c93; _gcl_au=1.1.411328068.1687545528; _gid=GA1.2.780727851.1687545529; pxcts=3161741c-11f5-11ee-8824-6a684353497a; _pxvid=31616837-11f5-11ee-8824-4794fd8aad2f; __qca=P0-428671139-1687545529212; SessionPersistence=PROFILEDATA%3A%3DauthorizableId%253Danonymous; _fbp=fb.1.1687545552476.407421743; __idcontext=eyJjb29raWVJRCI6IjJSY05scEREWGo2WGdpRkNDRnRDZUJqM1cwYyIsImRldmljZUlEIjoiMlJjTmxqWEd3QkdycnJxdFQ4N1VEVXQ1UXRpIiwiaXYiOiIiLCJ2IjoiIn0%3D; QuantumMetricUserID=66eba52ff98e0f386fa4378ac36af176; _pxhd=32b8a7d98147503056ad7b7f2674a8dd471a690f322b2f0bc5299a33a5db521a:31616837-11f5-11ee-8824-4794fd8aad2f; OptanonAlertBoxClosed=2023-06-24T00:01:40.032Z; language=en_US; amazon-pay-connectedAuth=connectedAuth_general; apay-session-set=%2F9c3rForl44v4BeMmDChddydS3zRTqvsuaSDnXvtD6qB%2FbxytXIy09wFSTa0ebo%3D; _ga_GV632QC56N=GS1.1.1687589841.4.0.1687589841.60.0.0; _ga=GA1.2.815683358.1687545528; _gat_UA-6997633-3=1; _uetsid=335bb0c011f511ee942063f824d8b01f; _uetvid=335bf57011f511eeb3858f05edb11646; OptanonConsent=isGpcEnabled=0&datestamp=Sat+Jun+24+2023+02%3A57%3A23+GMT-0400+(Eastern+Daylight+Time)&version=202306.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0004%3A1%2CC0001%3A1%2CC0002%3A1&AwaitingReconsent=false&geolocation=%3B; RT="z=1&dm=avis.com&si=fa246b95-22ee-43a6-90de-f738b45a9add&ss=lj9kh3mi&sl=0&tt=0&bcn=%2F%2F68794906.akstat.io%2F&nu=43hl6rgh&cl=2y22p"; _ga_8L27T28KZS=GS1.2.1687589843.4.1.1687589844.59.0.0; _px2=eyJ1IjoiNWUxYTU3ZTAtMTI1Yy0xMWVlLWJkNzQtOTViMzIwY2Y3ZjQ1IiwidiI6IjMxNjE2ODM3LTExZjUtMTFlZS04ODI0LTQ3OTRmZDhhYWQyZiIsInQiOjE2ODc1OTAxNDI1MjAsImgiOiJiNTdlMzA0OTU5ZjIyNjIzMWFiZDNkYzcyODhmZmVjYTNmYjUxZjdkYzNlMzBhYjU4MDI3MTY0YjVkOGVmYTM4In0=; _clck=1sjmsa5|2|fcq|0|1270', 
    'Devicetype': 'bigbrowser', 
    'Digital-Token': 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..d53lxN_-QZ6KTz8R.p57V9nOFVieY8iHEqQxC19Lg-f0jQVWDrI9vJwkA1GBl8sX5nCk6RRteo0FVWdYqcXew5KLlaXfWnA_DjG5bOkoqc8ZlwhL-tlbG5CPpHGr4kiU9Y3xgUApsNc87NYLh6BFEmCjHhykvEPcsatjhj5fTYiR3Y2cSEPUKd4VOqXINeLGUG81HzyBaWBjjfOWv6AvL92PQQsWG76-QPfiB2sbMFHrUMj2319T_Xm7ETbKmyG-3D3rhBeAnYM0nxzdH-iEC9kr3kDNHiFq94Ih3BARzMQZzTTQvgwOAsbH5YTl60TSXngTfl6ODMDs.YawNeB0HbrIeVdchkN23Sw', 
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

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
