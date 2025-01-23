// const puppeteer = require("puppeteer");
// const fs = require('fs');
// const path = require('path');
// const data = require('./index2.html')
// async function downloadPdfFromUrl(url, outputPath) {
//     const browser = await puppeteer.launch({ headless: "new" });
//     const page = await browser.newPage();
//
//     // Navigate to the specified URL
//     await page.goto(url, { waitUntil: "networkidle0" });
//
//     // Generate PDF from the page content
//     await page.pdf({ path: outputPath, format: "A4" });
//
//     // Close the browser
//     await browser.close();
// }
//
// const targetUrl = data;
// const outputFile = "downloaded_page3.pdf";
//
// downloadPdfFromUrl(targetUrl, outputFile)
//     .then(() => console.log(`PDF downloaded successfully at: ${outputFile}`))
//     .catch((error) => console.error("Error:", error));

import puppeteer from 'puppeteer';
import { readFileSync } from 'fs';


(async () => {
    console.log(puppeteer.defaultBrowserRevision);

    // Start the browser
    const browser = await puppeteer.launch();

    // Open a new blank page
    const page = await browser.newPage();

    // Set screen size
    await page.setViewport({ width: 1920, height: 1080 });

    // Open the index.html file
    const htmlContent = readFileSync('./index2.html', 'utf-8');

    // Now we use setContent instead of goto
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Use screen CSS instead of print
    await page.emulateMediaType('screen');

    // Render the PDF
    const pdf = await page.pdf({
        path: 'render.pdf', // Output the result in a local file
        printBackground: true,
        format: 'A4',
    });

    // Close the browser
    await browser.close();
})();