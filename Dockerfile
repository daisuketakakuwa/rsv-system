# ベースイメージの選択
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# ホストマシン上のファイルやディレクトリを
# Docker コンテナ内の /app ディレクトリにコピーしている。
COPY . .

# Reactアプリケーションのビルド
RUN npm install && npm run build

# Expressアプリケーションの起動
CMD ["npm", "start"]
