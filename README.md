## Architecutre
<img src="https://github.com/daisuketakakuwa/rsv-system/assets/66095465/9149f715-c239-4f71-b098-f9ed3ba3761a" width="700px" />

## MEMO

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
