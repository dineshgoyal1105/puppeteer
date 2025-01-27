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
    await page.setViewport({width: 1920, height: 1080});

    // Open the index.html file
    const htmlContent = readFileSync('./index2.html', 'utf-8');

    // Your dynamic data to be inserted into the HTML
    // Your dynamic data to be inserted into the HTML
    const data = [
        {
            name: 'Dinesh',
            rollNo: '43370***',
            city: 'New York'
        },
        {
            name: 'Bob',
            rollNo: '43371***',
            city: 'Los Angeles',
        },
        {
            name: 'Charlie',
            rollNo: '43372***',
            city: 'Chicago',
        },
        {
            name: 'David',
            rollNo: '43373***',
            city: 'Miami',
        },
        {
            name: 'Eve',
            rollNo: '43374***',
            city: 'Seattle',
        },
        {
            name: 'Frank',
            rollNo: '43375***',
            city: 'Boston',
        },
    ];

    // Add styles for alternating rows
    const styleContent = `
    <style>
        table {
            width: 50%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
        }

        /* Even Row - Light Color with Low Opacity */
        .even-row {
            background-color: rgba(240, 240, 240, 0.7); /* Light color with opacity */
        }

        /* Odd Row - Another Light Color with Low Opacity */
        .odd-row {
            background-color: rgba(255, 255, 255, 0.7); /* Light color with opacity */
        }

        /* Hover effect for rows */
        tr:hover {
            background-color: rgba(200, 200, 255, 0.5); /* Light hover effect */
        }
    </style>`;

    // Generate the table rows dynamically based on the data
    let tableRows = data.map((student, index) => {
        // Determine if the row is odd or even to apply alternating styles
        let rowClass = index % 2 === 0 ? 'even-row' : 'odd-row';

        return `
        <tr class="${rowClass}">
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${student.city}</td>
        </tr>
    `;
    }).join('');

    // Replace the placeholder {tableRows} with the generated rows in the HTML template
    const personalizedHtmlContent = htmlContent
        .replace('{tableRows}', tableRows);

    // Inject the styles into the HTML content
    const fullHtmlContent = styleContent + personalizedHtmlContent;

    // Now set the personalized HTML content in Puppeteer
    await page.setContent(fullHtmlContent, { waitUntil: 'networkidle0' });

    // Use screen CSS instead of print
    await page.emulateMediaType('screen');

    // Render the PDF
    const pdf = await page.pdf({
        path: 'render1.pdf', // Output the result in a local file
        printBackground: true,
        format: 'A4',
    });

    // Close the browser
    await browser.close();
})();