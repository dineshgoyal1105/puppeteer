const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.geeksforgeeks.org/top-nodejs-design-patterns/');
    await page.screenshot({path: 'example3.png'});
    await browser.close();
})();
