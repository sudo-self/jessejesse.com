// pages/api/screenshot.js

import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://textbrush.pages.dev');
    const screenshot = await page.screenshot();
    await browser.close();
    
    res.setHeader('Content-Type', 'image/png');
    res.end(screenshot, 'binary');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).end('Internal Server Error');
  }
}
