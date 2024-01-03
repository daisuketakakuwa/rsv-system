import express from 'express';
import verifyToken from './middleware/verifyToken';

const apiRouter = express.Router();

apiRouter.get('/userInfo', (req, res) => {
  if (req.session.user) {
    res.json({ email: req.session.user.email });
  } else {
    res.json({ email: '' });
  }
});

apiRouter.post('/userInfo', (req, res) => {
  const { email, token } = req.body;
  req.session.user = { email, token };
  res.status(200).send('Session saved.');
});

// TBD...認証が必要なAPIにアクセスするときは verifyTokenミドルウェアを仲介する
apiRouter.get('/protected-one', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});

export default apiRouter;
