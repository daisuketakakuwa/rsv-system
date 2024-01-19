import express from 'express';
import verifyToken from './middleware/verifyToken';

const apiRouter = express.Router();

// TBD...認証が必要なAPIにアクセスするときは verifyTokenミドルウェアを仲介する
apiRouter.get('/protected-one', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});

export default apiRouter;
