const path = require('path');

async function screenshot(page, screenshotDir, name, waitMs = 500) {
  if (waitMs > 0) await page.waitForTimeout(waitMs);
  await page.screenshot({ path: path.join(screenshotDir, name) });
}

async function waitForSelector(page, selector, timeout = 3000) {
  await page.waitForSelector(selector, { timeout });
}

async function waitForFunction(page, fn, timeout = 1000, ...args) {
  await page.waitForFunction(fn, { timeout }, ...args);
}

async function waitForText(page, text, timeout = 2000) {
  await page.waitForFunction(
    t => document.body.innerText.includes(t),
    { timeout },
    text
  );
}

async function waitTimeout(page, ms) {
  await page.waitForTimeout(ms);
}

// 导航到指定tab，并等待页面稳定
async function gotoTab(page, tabText, timeout = 5000) {
  await Promise.all([
    page.click(`text=${tabText}`),
    page.waitForNavigation({ waitUntil: 'networkidle2', timeout })
  ]);
}

// 通用测试入口封装
async function runTestEntry(testFn) {
  const puppeteer = require('puppeteer');
  let browser;
  let page;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1200, height: 800 },
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    });
    page = await browser.newPage();
    await testFn(page, browser);
  } catch (error) {
    console.error('❌ 测试入口异常:', error.stack || error.message);
  } finally {
    if (page) await page.waitForTimeout(2000);
    if (browser) await browser.close();
  }
}

module.exports = {
  screenshot,
  waitForSelector,
  waitForFunction,
  waitForText,
  waitTimeout,
  gotoTab,
  runTestEntry,
}; 