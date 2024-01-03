import admin from 'firebase-admin';
import serviceAccountKey from '../../serviceaccount-firebase-admin-sdk';

// Firebase Admin SDKの初期化
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

const verifyToken = async (req, res, next) => {
  const idToken = req.session.user && req.session.user.token;
  if (!idToken) {
    return res.status(401).json({ error: 'No token exists' });
  }
  try {
    await admin.auth().verifyIdToken(idToken);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export default verifyToken;
