const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async function() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // Read the HTML file from the file system
        const htmlFilePath = path.join(__dirname, 'index2.html');
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');


        await page.setViewport({ width: 1920, height: 1080 });
        await page.setContent(htmlContent);

        await page.pdf({
            path: "onePdf5.pdf",
            format: "a4",
            printBackground: true

        });

        await browser.close();
    } catch (error) {
        console.error(error);
    }
})();
