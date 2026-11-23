// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // 拡張機能のコンテキストはテストごとに起動するため並列にしない
  workers: 1,
  reporter: 'list',
});
