const puppetter = require('puppeteer');
(async ()=>{
    const browser = await puppetter.launch({
        "headless": false
    });
    const page = await browser.newPage();
   await page.goto("https://www.geeksforgeeks.org/bubble-sort-algorithm/");

   await browser.close();

    }
)();