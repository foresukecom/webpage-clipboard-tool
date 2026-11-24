// 拡張機能として配布するファイル・ディレクトリ（リポジトリルートからの相対パス）。
// ストア提出用ZIPの作成とテスト用の拡張の読み込みの両方で使う
const EXTENSION_FILES = ['manifest.json', 'background.js', 'icons'];

module.exports = { EXTENSION_FILES };
