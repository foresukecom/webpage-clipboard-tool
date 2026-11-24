# ローカル開発用のタスク。`just` でレシピ一覧を表示する
# ツールは devShell（nix develop / direnv）に入っている前提

# レシピ一覧
default:
    @just --list --unsorted

# 依存のインストール（初回・clone 直後）。postinstall で Playwright 用の Chromium も取得する
setup:
    npm install

# 配布ファイルだけを dist/extension/ にコピーする。Chrome にはこのディレクトリを読み込む
build:
    npm run build

# Playwright のテストを実行する
test:
    npm test

# ストア提出用の ZIP を dist/ に作成する
package:
    npm run package

# store/*.html から 1280x800 のスクリーンショットを作成する
screenshots:
    npm run screenshots

# images/icon-source*.svg から icons/ を再生成する
icons:
    ./scripts/generate-icons.sh

# 生成物を削除する
clean:
    rm -rf dist test-results playwright-report
