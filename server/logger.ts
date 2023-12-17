import moment from 'moment-timezone';
import winston from 'winston';
import expressWinston from 'express-winston';

// .env利用の有効化
import dotenv from 'dotenv';
dotenv.config();

const { format } = winston;
const { combine, colorize, simple, json } = format;

const env = process.env.NODE_ENV || 'DEV';

// combine関数の引数に直接 timestamp() を定義するのがStandardな形
// Timezone付きで定義する場合は以下のように設定する。
const asiaTokyoTimestamp = format((logObj) => {
  return {
    ...logObj,
    timestamp: moment().tz('Asia/Tokyo').locale('ja').format('YYYY-MM-DD HH:mm:ss.SSS'),
  };
});

// colorize関数【ローカル起動時向け】
// - 出力ログが色付けされる。
// - 色付けはログ解析に支障をきたすことがあるので本番環境では
//   シンプルなフォーマットを使うことが推奨

// simple関数
// - ログレベル、タイムスタンプ、ログメッセージを含む標準的な形式でログを出力する。
// - カスタムフォーマットを適用する必要がないなら これで十分。

// json関数【Elasticsearch/Kibanaを利用する本番環境向け】
// - ログを外部のツールで処理する場合や、ログデータを分析する際に便利です
const configureFormat = (env: string) =>
  env === 'DEV' ? combine(colorize(), simple()) : combine(asiaTokyoTimestamp(), json());

const consoleLogTransport = new winston.transports.Console({
  format: configureFormat(env),
});

// winstonでの基本設定
const logger = winston.createLogger({
  transports: [consoleLogTransport],
  exceptionHandlers: [consoleLogTransport],
});

// express-winstonでの追加設定
export const accessLogger = expressWinston.logger({
  winstonInstance: logger,
  msg: 'Completed {{res.statusCode}} {{req.method}} {{req.url}} ({{res.responseTime}}ms)',
  //   msg: 'Completed {{res.statusCode}} {{req.method}} {{req.url}} ({{res.responseTime}}ms) [trxId: {{req.reqContext.trxId}}]',
  meta: false,
});

export default logger;

// export const accessLogger = winston.createLogger({
//     level: "INFO",
//     tra
// })

//msg: "Completed {{res.statusCode}} {{req.method}} {{req.url}}"
