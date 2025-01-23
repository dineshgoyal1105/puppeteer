const puppeteer = require("puppeteer");

async function downloadPdfFromUrl(url, outputPath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url, { waitUntil: "networkidle0" });

    // Generate PDF from the page content
    await page.pdf({ path: outputPath, format: "A4" });

    // Close the browser
    await browser.close();
}

const targetUrl = "http://localhost:63342/puppetter/index2.html?_ijt=og9rorig9cotnji85furbkl24g";
const outputFile = "downloaded_page2.pdf";

downloadPdfFromUrl(targetUrl, outputFile)
    .then(() => console.log(`PDF downloaded successfully at: ${outputFile}`))
    .catch((error) => console.error("Error:", error));