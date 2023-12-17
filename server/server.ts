import express from 'express';

const app = express();

app.get('/up', (req, res) => {
  res.send('OK');
});

app.listen(4000, () => {
  console.log('App is listening on port 4000!');
});
