#!/usr/bin/env bash
# images/icon-source*.svg から拡張機能用のアイコンを生成する
set -euo pipefail

cd "$(dirname "$0")/.."

render() { # <svg> <size> <out>
  magick -background none -density 384 "$1" -resize "$2x$2" "$3"
}

# 16px はツールバーや右クリックメニューで使う。通常版だとリンク記号が潰れるため、
# 線を太くした簡略版から作る
render images/icon-source-16.svg 16 icons/icon-16.png

# 48px は拡張機能の管理画面で使うため、余白なしで縮小する
render images/icon-source.svg 48 icons/icon-48.png

# 128px はストアにも使う。ガイドラインに合わせて 96px の絵の周りに 16px の透明な余白を付ける
render images/icon-source.svg 96 icons/icon-128.png
magick icons/icon-128.png -background none -gravity center -extent 128x128 icons/icon-128.png
