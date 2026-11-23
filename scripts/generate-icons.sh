#!/usr/bin/env bash
# images/icon-source.png から拡張機能用のアイコンを生成する
set -euo pipefail

cd "$(dirname "$0")/.."
src=images/icon-source.png

# 16px / 48px はツールバーや拡張機能管理画面で使うため、余白なしで縮小する
for size in 16 48; do
  magick "$src" -resize "${size}x${size}" "icons/icon-${size}.png"
done

# 128px はストアにも使う。ガイドラインに合わせて 96px の絵の周りに 16px の透明な余白を付ける
magick "$src" -resize 96x96 -background none -gravity center -extent 128x128 icons/icon-128.png
