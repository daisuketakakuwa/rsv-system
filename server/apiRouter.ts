import express from 'express';

const apiRouter = express.Router();

apiRouter.get('/api/userInfo', (req, res) => {
  if (req.session.user) {
    res.json({ email: req.session.user.email });
  } else {
    res.json({ email: '' });
  }
});

apiRouter.post('/api/userInfo', (req, res) => {
  const { email, token } = req.body;
  req.session.user = { email, token };
  res.status(200).send('Session saved.');
});

export default apiRouter;
