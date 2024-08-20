const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: true });
    console.log('Browser launched.');

    const page = await browser.newPage();
    console.log('New page created.');

    // Set extra headers
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    });

    const url = 'https://nutripure.fr';
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    console.log('Page loaded.');

    // Get the source code of the page
    const sourceCode = await page.content();
    console.log('Source Code:', sourceCode);

    // Extract the list of cookies
    const cookies = await page.cookies();
    console.log('Cookies:', cookies);

    await browser.close();
    console.log('Browser closed.');
  } catch (error) {
    console.error('Error:', error);
  }
})();