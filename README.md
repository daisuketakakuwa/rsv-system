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

## Deploy to GCP Cloud Run

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

## TroubleShootingメモ

## Firebase

- [Firebase SDK/クライアント側のセットアップ｜公式ドキュメント](https://firebase.google.com/docs/auth/web/start?hl=ja)
- [Google認証｜公式ドキュメント](https://firebase.google.com/docs/auth/web/google-signin?hl=ja)

### ImageのPush権限がなかったので付与する。

ログイン中のIAMユーザーを確認する。
@@

```
gcloud auth list
```

IAMユーザーの権限を確認する

```
gcloud projects get-iam-policy YOUR_PROJECT_ID --flatten="bindings[].members" --format="table(bindings.role,bindings.members)" | findstr "YOUR_USER_EMAIL"
```
