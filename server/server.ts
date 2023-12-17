import express from 'express';
import path from 'path';
import logger, { accessLogger } from './logger';

const app = express();
const port = process.env.PORT || 4000;

// APIへのリクエストはすべてLogに出す(winstonのログTemplate使いたい)
app.use(accessLogger);

// APIへのプロキシ
app.get('/api/hello', (req, res) => {
  res.send('HELLO');
});
app.get('/api/error', (req, res) => {
  logger.error('Error occured.');
  res.send('ERROR occured');
});

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
