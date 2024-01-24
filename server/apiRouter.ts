import express from 'express';
import eventController from './controller/EventController';
import RuntimeError from './error/RuntimeError';
import logger from './logger';
import verifyToken from './middleware/verifyToken';

const apiRouter = express.Router();

// TBD...認証が必要なAPIにアクセスするときは verifyTokenミドルウェアを仲介する
apiRouter.get('/protected-one', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});

apiRouter.use(eventController);

// catch error here
apiRouter.use((err: RuntimeError, req, res, next) => {
  logger.error(err.message);
  res.status(err.status).json({
    message: err.message,
  });
});

export default apiRouter;
