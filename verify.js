const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:5174/');
  
  // Wait for React to load
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'hero_start.png' });

  // Scroll 500px - showProblem should be true
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hero_problem.png' });

  // Scroll 1500px - shrink should have started
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'hero_shrink.png' });

  await browser.close();
}

run().catch(console.error);
