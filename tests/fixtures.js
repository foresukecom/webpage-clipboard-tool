// @ts-check
const fs = require('fs');
const os = require('os');
const path = require('path');
const { test: base, chromium } = require('@playwright/test');

const EXTENSION_FILES = ['manifest.json', 'background.js', 'icon.png'];

// 本番の拡張は activeTab 権限のため、ユーザー操作（右クリックメニュー）なしでは
// ページにスクリプトを注入できない。テスト用にコピーした拡張だけに
// host_permissions を足して、操作なしで注入できるようにする。
function prepareTestExtension() {
  const root = path.join(__dirname, '..');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'wct-extension-'));
  for (const file of EXTENSION_FILES) {
    fs.copyFileSync(path.join(root, file), path.join(dir, file));
  }
  const manifestPath = path.join(dir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.host_permissions = ['<all_urls>'];
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  return dir;
}

const test = base.extend({
  context: async ({}, use) => {
    const extensionPath = prepareTestExtension();
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
      ],
    });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await use(context);
    await context.close();
    fs.rmSync(extensionPath, { recursive: true, force: true });
  },
  serviceWorker: async ({ context }, use) => {
    let [worker] = context.serviceWorkers();
    if (!worker) worker = await context.waitForEvent('serviceworker');
    await use(worker);
  },
});

module.exports = { test, expect: test.expect };
