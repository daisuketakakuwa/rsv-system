import express from 'express';
import session from 'express-session';
import path from 'path';
import apiRouter from './apiRouter';
import authRouter from './authRouter';
import logger, { accessLogger } from './logger';

// セッションに格納するデータ型
interface User {
  email: string;
  token: string;
}

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

const app = express();
const port = process.env.PORT || 4000;

// POSTパラメータを受け取るための設定
app.use(express.urlencoded({ extended: true }));
// POSTパラメータの JSON文字列 → JSオブジェクト へ変換してくれる
app.use(express.json());

// セッションの設定
app.use(
  session({
    // セッションCookieの署名に利用する。Browserで生のSessionIDが公開されることを防ぐ。
    secret: 'your-secret-key',
    // セッションデータがリクエストされるたびにセッションストアに保存される。
    resave: false,
    // true → 認証などのユーザー情報が確立される前にもセッションが生成され、保存される
    // false →  明示的に書き込みを行わない限りセッションは生成されない。
    //
    // ログイン時にPOST /userInfo で req.session.xxx = するときに
    // 初めてセッションを生成するようにする。
    // = これで【ログインした時間から maxAge 時間たてばセッション(ログイン済状態)が
    //   expiredするようになる👍
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30, // ミリ秒 30分
    },
  }),
);

// APIへのリクエストはすべてLogに出す(winstonのログTemplate使いたい)
app.use(accessLogger);

app.use('/api/auth', authRouter);

app.use('/api', apiRouter);

// 静的ファイル（ビルドされた React アプリ）の提供
app.use(express.static(path.join(__dirname, '../build')));

// ルートへのアクセス時に index.html を提供
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// その他のリクエストに対しては、index.html を返す
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
