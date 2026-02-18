const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5174/');
  await page.waitForTimeout(1000);

  // Take initial screenshot
  await page.screenshot({ path: 'hero_0.png' });

  // Scroll to trigger first text
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hero_300.png' });

  // Scroll more to see full text before shrink
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hero_600.png' });

  // Scroll more to trigger shrink
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hero_1200.png' });

  await browser.close();
})();
