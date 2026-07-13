const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/wiz', { waitUntil: 'networkidle0', timeout: 10000 });
  const html = await page.content();
  fs.writeFileSync('wiz_dump.html', html);
  
  await browser.close();
})();
