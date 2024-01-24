## Architecutre

<img src="https://github.com/daisuketakakuwa/rsv-system/assets/66095465/9149f715-c239-4f71-b098-f9ed3ba3761a" width="700px" />

## About Application

### 画面の認証

- 認証が必要な画面は`AUTHENTICATED_PAGES`へパスを登録すること。

### APIの認証

### APIのエラーハンドリング

- `throw new RuntimeError`で例外を投げる。。
- すべての例外は **Errorハンドリング用ミドルウェア関数** にて処理する。各エンドポイント内で`try-catch`を書く必要なし👍
- 🔴課題: Repository/Service/Controllerすべてに`try-catch`構文を書く必要がある。

```js
apiRouter.get('/error-api', (req, res, next) => {
  try {
    // throw error
    throw new RuntimeError(500, 'This is a simulated error.');
  } catch (error) {
    // pass error
    return next(error)
  }
});

// catch error
apiRouter.use((err: RuntimeError, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
  });
});
```

## DB

### ID Strategy -> "UUID"

- UUID(128bit) は MySQLの`CHAR(36)`で保存する。
- Storage効率的には`BINARY(16)`/16B/128bit の方がよいが、基本`CHAR`でも問題ない。
- UUIDの生成はPrismaClientが実装するUUIDGeneratorを利用する -> `@default(uuid())`

```
model event {
  id             String    @id @db.Char(36) @default(uuid())
```

### 日付項目

- 日付項目はUTCで保持する。
- 登録APIの日付パラメータ(JST) → UTC へ変換してDB登録。
- DBより日付(UTC)取得 -> JSTへ変換してレスポンス返す。

```ts

```

## Prisma

- Schemaファイル `prisma/schema.prisma` にテーブル定義を書いていく。
- `prisma db pull`: DBに定義済のテーブル定義/スキーマを schema.prismaへ書きおこす。
- `prisma generate`: Clientコードを自動生成する。

### DBスキーマ定義

1. まずSQLでテーブル定義を書く -> `db/schema.sql`
2. 1をDBへ反映する。
3. `prisma db pull`でschema.prismaへテーブル定義を反映する。
4. `prisma generate`でClientコードを自動生成する。<br>Clientコードは `import PrismaClient from '@prisma/client');`で利用する。

### Connection Pool

TBD

### Error

https://www.prisma.io/docs/orm/reference/error-reference

## MySQL

ログイン

```
mysql -h localhost --user=root --password=passw@rd rsvSystemDb --port=3319
```

## Run on local with building image

```js
// -t: タグ名
docker build -t rsv-system .
```

```js
docker run -p 3000:3000 rsv-system
```

## Deploy on GCP

1. Build image on local.
2. Deploy image to GCP Artifactory Registry.
3. Run container on GCP Cloud Run.

### 1. Dockerイメージのビルド

✅タグ名に「Region」「GCPのProjectID」「GCPのRegistryID」「GCPのRepositoryID」を含めてビルドする

```
docker build -t LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:version .
```

### 2. GCP Artifact Registry へ Dockerイメージをデプロイ

#### 2-1. Dockerイメージに認証情報を付与する。

```
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

#### 2-2. GCP Artifactory Registryへイメージ登録。

```
docker push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE
```

### 3. GCP Cloud Run上でコンテナ起動

```
gcloud run deploy YOUR_SERVICE_NAME --image gcr.io/YOUR_PROJECT_ID/your-image:latest --platform managed
```

# TroubleShootingメモ

## Styled Components

### [transient-props](https://styled-components.com/docs/api#transient-props)で"unknown props"エラー解消

NG

```tsx
const Overlay = styled.div<{ show: number }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
// showがdivのCSS属性として定義されてしまう。
<Overlay show={+show} />;
```

OK

```tsx
const Overlay = styled.div<{ $show: number }>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
`;
// showはStyledComponentだけに渡す(CSS属性として解決されない)形にする。
<Overlay $show={show} />;
```

## Firebase

- [Firebase SDK/クライアント側のセットアップ｜公式ドキュメント](https://firebase.google.com/docs/auth/web/start?hl=ja)
- [Google 以外の環境(ローカル)で SDK を初期化する < Firebase Admin SDK/サーバ側のセットアップ｜公式ドキュメント](https://firebase.google.com/docs/admin/setup?hl=ja)
- [Google認証｜公式ドキュメント](https://firebase.google.com/docs/auth/web/google-signin?hl=ja)
