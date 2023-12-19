# MEMO

- package.jsonに`type: "module"`は定義しない＝Rollupでバンドルするから。
-

## Build image and Run on local

```js
// -t: タグ名
docker build -t rsv-system .
```

```js
docker run -p 3000:3000 rsv-system
```

## Build image → Deploy image → Run container

### 1. Dockerイメージのビルド

✅タグ名に「Region」「GCPのProjectID」「GCPのRegistryID」「GCPのRepositoryID」を含めてビルドする

```
docker build -t LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE:version .
```

### 2. GCP Artifact Registry へ Dockerイメージをデプロイ

#### 1-1. Dockerイメージに認証情報を付与する。

```
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

#### 1-2. Artifactory Registryにプッシュする。

```
docker push LOCATION-docker.pkg.dev/PROJECT-ID/REPOSITORY/IMAGE
```

### 3. GCP Cloud Runへデプロイ

```
gcloud run deploy YOUR_SERVICE_NAME --image gcr.io/YOUR_PROJECT_ID/your-image:latest --platform managed
```

## TroubleShootingメモ

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
