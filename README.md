## Architecutre

<img src="https://github.com/daisuketakakuwa/rsv-system/assets/66095465/9149f715-c239-4f71-b098-f9ed3ba3761a" width="700px" />

## About Application

- 認証が必要な画面は`AUTHENTICATED_PAGES`へパスを登録すること。

## Prisma

- Schemaファイル `prisma/schema.prisma` にテーブル定義を書いていく。
- `prisma db pull`: DBに定義済のテーブル定義/スキーマを schema.prismaへ書きおこす。
- `prisma generate`: Clientコードを自動生成する。

### Prisma 運用方法

1. まずSQLでテーブル定義を書く -> `db/schema.sql`
2. 1をDBへ反映する。
3. `prisma db pull`でschema.prismaへテーブル定義を反映する。
4. `prisma generate`でClientコードを自動生成する。<br>Clientコードは `import PrismaClient from '@prisma/client');`で利用する。

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
