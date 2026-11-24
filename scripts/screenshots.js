// store/*.html をストア用スクリーンショット（1280x800）として PNG に書き出す
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const storeDir = path.join(__dirname, '..', 'store');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  for (const file of fs.readdirSync(storeDir).filter((f) => f.endsWith('.html'))) {
    const out = path.join(storeDir, file.replace(/\.html$/, '.png'));
    await page.goto(`file://${path.join(storeDir, file)}`);
    await page.screenshot({ path: out });
    console.log(`${path.relative(process.cwd(), out)} を作成しました`);
  }
  await browser.close();
})();
