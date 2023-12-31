## Architecutre

<img src="https://github.com/daisuketakakuwa/rsv-system/assets/66095465/9149f715-c239-4f71-b098-f9ed3ba3761a" width="700px" />

## MEMO

- package.jsonに`type: "module"`は定義しない＝Rollupでバンドルするから。
-

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
