// 拡張機能として配布するファイルだけを dist/extension/ にコピーする。
// リポジトリ直下を Chrome に読み込むと .direnv/ や node_modules/ まで拡張の一部として扱われるため、
// 開発時もこのディレクトリを読み込む
const fs = require('fs');
const path = require('path');
const { EXTENSION_FILES } = require('./extension-files');

const root = path.join(__dirname, '..');
const defaultOutDir = path.join(root, 'dist', 'extension');

function buildExtension(outDir = defaultOutDir) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  for (const file of EXTENSION_FILES) {
    fs.cpSync(path.join(root, file), path.join(outDir, file), { recursive: true });
  }
  return outDir;
}

module.exports = { buildExtension };

if (require.main === module) {
  const outDir = buildExtension();
  console.log(`${path.relative(root, outDir)}/ を作成しました`);
}
