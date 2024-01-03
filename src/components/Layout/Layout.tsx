import { ReactNode, useEffect, useState } from 'react';
import { signInWithGoogle, signOutWithGoogle } from '../../auth/google/googleAuth';
import { HIDE_MENU_BUTTONS_PAGES } from '../../utils/constants';
import { fetchUserInfo, saveUserInfo } from '../../utils/requestHandler';
import LoginButton from '../LoginButton/LoginButton';
import Modal from '../Modal/Modal';
import SlideButton from '../SlideButton/SlideButton';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const [showMenuButtons, setShowMenuButtons] = useState(true);
  useEffect(() => {
    setShowMenuButtons(!HIDE_MENU_BUTTONS_PAGES.includes(window.location.pathname));
  }, [window.location.pathname]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  // TODO: 認証情報を Context で保持する。
  const [userInfo, setUserInfo] = useState({ email: '' });

  // Browser/Tabを閉じてもセッションIDが残っていれば認証済のまま
  useEffect(() => {
    fetchUserInfo().then((result) => setUserInfo(result));
  }, []);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          width: '100%',
          height: '80px',
          borderBottom: '1px solid black',
        }}>
        <div
          style={{
            height: '100%',
            width: '15%',
            display: 'flex',
            flex: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <div style={{ fontSize: '30px' }}>RSV</div>
        </div>
        <div
          style={{
            height: '100%',
            width: '85%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
          }}>
          {userInfo.email && (
            <p style={{ marginRight: '10px' }}>ログインユーザー：{userInfo.email}</p>
          )}
          {showMenuButtons && (
            <>
              <SlideButton $margin="0px 10px">Mypage</SlideButton>
              <SlideButton
                $margin="0px 50px"
                onClick={async () => {
                  if (userInfo.email) {
                    signOutWithGoogle();
                    setUserInfo({ email: '' });
                    await saveUserInfo('', '');
                  } else {
                    setShowModal(true);
                  }
                }}>
                {userInfo.email ? 'ログアウト' : 'ログイン'}
              </SlideButton>
            </>
          )}
        </div>
      </div>
      <Modal show={showModal} toggleModal={toggleModal}>
        <div style={{ textAlign: 'center' }}>
          <LoginButton>
            <div style={{ display: 'flex' }}>
              <img
                style={{ display: 'inline-block', marginRight: '5px' }}
                src="src/assets/img/google_icon.png"
                width="20px"
                height="20px"
              />
              <span
                style={{ display: 'inline-block' }}
                onClick={async () => {
                  await signInWithGoogle();
                  setShowModal(false);
                  const userInfo = await fetchUserInfo();
                  setUserInfo({ email: userInfo.email });
                }}>
                Googleアカウントでログイン
              </span>
            </div>
          </LoginButton>
          <LoginButton>メールアドレスでログイン</LoginButton>
        </div>
      </Modal>
      <div style={{ width: '100%', position: 'absolute', top: '100px', left: '0' }}>{children}</div>
    </>
  );
};

export default Layout;
