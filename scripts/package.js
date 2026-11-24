// ストア提出用のZIPを dist/ に作成する
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { buildExtension } = require('./build');

const root = path.join(__dirname, '..');
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const zipPath = path.join(root, 'dist', `webpage-clipboard-tool-${version}.zip`);

const extensionDir = buildExtension();
fs.rmSync(zipPath, { force: true });
// -X: macOSの拡張属性などを含めない
execFileSync('zip', ['-r', '-X', zipPath, '.', '-x', '.DS_Store', '*/.DS_Store'], {
  cwd: extensionDir,
  stdio: 'inherit',
});
console.log(`\n${path.relative(root, zipPath)} を作成しました`);
