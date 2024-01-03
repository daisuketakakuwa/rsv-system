import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { saveUserInfo } from '../../utils/requestHandler';
import auth from '../firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // 1. Google認証
    const userCredential = await signInWithPopup(auth, provider);
    const oauthCredential = GoogleAuthProvider.credentialFromResult(userCredential);
    // 2. セッション保存
    const email = userCredential.user.email || '';
    const token = oauthCredential?.idToken || '';
    await saveUserInfo(email, token);
  } catch (err) {
    alert('Some error occured while signing in.');
  }
};

export const signOutWithGoogle = () => {
  signOut(auth)
    .then(() => {
      alert('ログアウトに成功しました。');
    })
    .catch((error) => {
      alert('ログアウトに失敗しました。');
    });
};
