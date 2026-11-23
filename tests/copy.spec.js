// @ts-check
const { test, expect } = require('./fixtures');

const PAGE_URL = 'https://example.test/articles/1?utm_source=x#section';
const PAGE_TITLE = 'サンプル記事';

test.beforeEach(async ({ context, page }) => {
  // 外部に通信せず、固定のHTMLを返す
  await context.route('https://example.test/**', (route) =>
    route.fulfill({
      contentType: 'text/html; charset=utf-8',
      body: `<!doctype html><title>${PAGE_TITLE}</title><body>test</body>`,
    }),
  );
  await page.goto(PAGE_URL);
});

// 右クリックメニューはPlaywrightから操作できないため、
// メニュークリック時に呼ばれる handleMenuClick を直接実行する。
// execCommand('Copy') はユーザー操作の直後でないと失敗するので、
// 右クリックの代わりにページをクリックしてから呼ぶ
async function clickMenu(page, serviceWorker, menuItemId) {
  await page.mouse.click(10, 10);
  await serviceWorker.evaluate(async (menuItemId) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    // @ts-ignore background.js のトップレベル関数
    await handleMenuClick({ menuItemId }, tab);
  }, menuItemId);
}

const cases = [
  ['copyMarkdown', `[${PAGE_TITLE}](${PAGE_URL})`],
  ['copyTitleAndURL', `${PAGE_TITLE}\n${PAGE_URL}`],
  ['copyTitle', PAGE_TITLE],
  ['copyURL', PAGE_URL],
  ['copyURLWithoutQuery', 'https://example.test/articles/1'],
];

for (const [menuItemId, expected] of cases) {
  test(`${menuItemId} でクリップボードにコピーされる`, async ({ page, serviceWorker }) => {
    await clickMenu(page, serviceWorker, menuItemId);
    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toBe(expected);
  });
}
