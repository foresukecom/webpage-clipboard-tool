# ベースイメージから継承
FROM devcontainer-base:latest

# rootユーザーに切り替えてパッケージインストール
USER root

# Node.js 24.xのインストール
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Playwright実行に必要なOSパッケージ
# xvfb: Chrome拡張機能のテストはヘッドレスシェルでは動かないため、仮想ディスプレイ上で実行する
# zip:  ストア提出用のパッケージ作成（npm run package）に使う
# fonts-noto-cjk: これが無いとスクリーンショット内の日本語が豆腐（□）になる。
#                 Playwrightのinstall-depsが入れるfonts-liberationはLatinのみ
RUN apt-get update && apt-get install -y \
    xvfb \
    zip \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Chromiumの動作に必要な共有ライブラリ群をインストールする。
# ブラウザ本体はpackage.jsonのPlaywrightとバージョンを一致させる必要があるため、
# ここでは入れずにpostCreateCommandの `playwright install` に任せる。
RUN npx --yes playwright@1.63.0 install-deps chromium \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ブラウザの配置先。developer所有にしておかないと playwright install が書き込めない
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN mkdir -p /ms-playwright && chown developer:developer /ms-playwright

# 開発者ユーザーに戻る
USER developer

# グローバルにインストールする開発ツール
# typescript / vite はプロジェクトの devDependencies を使うためグローバルには入れない
RUN npm install -g \
    pnpm \
    yarn

# Node.js用のzsh設定追加
RUN echo '' >> ~/.zshrc \
    && echo '# Node.js environment' >> ~/.zshrc \
    && echo 'export PATH=$HOME/.npm-global/bin:$PATH' >> ~/.zshrc \
    && echo 'export NPM_CONFIG_PREFIX=$HOME/.npm-global' >> ~/.zshrc

# 作業ディレクトリ
WORKDIR /workspaces
