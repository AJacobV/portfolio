const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match a desktop screen
  await page.setViewport({ width: 1440, height: 900 });
  
  await page.goto('http://localhost:3000/wiz', { waitUntil: 'networkidle0', timeout: 10000 });
  
  await page.screenshot({ path: 'public/wiz_screenshot2.png' });
  console.log('Screenshot saved to public/wiz_screenshot2.png');
  
  await browser.close();
})();
