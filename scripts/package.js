// ストア提出用のZIPを dist/ に作成する
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { EXTENSION_FILES } = require('./extension-files');

const root = path.join(__dirname, '..');
const { version } = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const distDir = path.join(root, 'dist');
const zipPath = path.join(distDir, `webpage-clipboard-tool-${version}.zip`);

fs.mkdirSync(distDir, { recursive: true });
fs.rmSync(zipPath, { force: true });
// -X: macOSの拡張属性などを含めない
execFileSync('zip', ['-r', '-X', zipPath, ...EXTENSION_FILES, '-x', '.DS_Store', '*/.DS_Store'], {
  cwd: root,
  stdio: 'inherit',
});
console.log(`\n${path.relative(root, zipPath)} を作成しました`);
