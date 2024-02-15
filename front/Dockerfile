FROM node:20.11.0-slim

# 環境変数を設定
ENV TZ Asia/Tokyo

# 作業ディレクトリを指定
WORKDIR /app

# ホストのpackage.jsonとyarn.lockをコンテナにコピーし、依存関係をインストール
COPY package.json yarn.lock /app/
RUN yarn install

# ホストのソースコードをコンテナにコピー
COPY . /app

# サーバーを起動
CMD ["yarn", "dev", "-p", "4000"]