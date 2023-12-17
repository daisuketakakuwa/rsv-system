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

## Deploy to GCP Container Registry
