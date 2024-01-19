import express from 'express';
import verifyToken from './middleware/verifyToken';

const authRouter = express.Router();

authRouter.get('/userInfo', verifyToken, (req, res) => {
  return res.json({ email: req.session.user.email });
});

// 検証に利用するIDトークンはセッションに格納する。
authRouter.post('/userInfo', (req, res) => {
  const { email, token } = req.body;
  req.session.user = { email, token };
  res.status(200).send('Session saved.');
});

export default authRouter;
