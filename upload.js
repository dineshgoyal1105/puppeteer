const puppeteer = require('puppeteer');

(async () => {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Open the HTML file (you can replace it with your local path if it's on your machine)
    await page.goto('http://localhost:63342/puppetter/index.html?_ijt=oi2tfa9hlp0st9ipm4o7co12cl'); // Replace with the correct path to your HTML file

    // Wait for the file input field to appear
    await page.waitForSelector('input[type="file"]');

    // Select the file input and upload a file
    const fileInput = await page.$('input[type="file"]');
    await fileInput.uploadFile('./path-to-local-file.jpg'); // Replace with the actual file path you want to upload

    // Wait for the success message after upload
    await page.waitForSelector('#upload-success-message');

    // Log the download URL from the success message
    const downloadUrl = await page.evaluate(() => {
        return document.querySelector('#download-link').href;
    });

    console.log('Download URL:', downloadUrl); // Output the URL

    // Close the browser
    await browser.close();
})();
