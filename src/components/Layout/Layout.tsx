import { ReactNode, useEffect, useState } from 'react';
import { signInWithGoogle, signOutWithGoogle } from '../../auth/google/googleAuth';
import { AUTHENTICATED_PAGES, HIDE_MENU_BUTTONS_PAGES } from '../../utils/constants';
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
  // TODO: ローディング状態を Context で保持する。
  const [isLoading, setIsLoading] = useState(false);

  const [canOpenPage, setCanOpenPage] = useState(false);

  // 画面が変わったとき と ログインが行われた場合に 以下のチェックを行う。
  //   1. 認証が必要なページか -> NO -> 開く
  //         ↓ YES
  //   2. 認証済か -> NO -> 開かない。
  //         ↓ YES
  //      画面を開く
  useEffect(() => {
    const isNecessaryToAuth = AUTHENTICATED_PAGES.includes(window.location.pathname);
    if (isNecessaryToAuth) {
      fetchUserInfo().then((res) => {
        const isAuthenticated = res.status == 200;
        setCanOpenPage(isAuthenticated);
      });
    } else {
      setCanOpenPage(true);
    }
  }, [window.location.pathname, userInfo]);

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
                  const userInfo = (await fetchUserInfo()).data;
                  setUserInfo({ email: userInfo.email });
                }}>
                Googleアカウントでログイン
              </span>
            </div>
          </LoginButton>
          <LoginButton>メールアドレスでログイン</LoginButton>
        </div>
      </Modal>
      <div style={{ width: '100%', position: 'absolute', top: '100px', left: '0' }}>
        {canOpenPage ? <>{children}</> : <h1>未認証のため画面を開けません。</h1>}
      </div>
    </>
  );
};

export default Layout;
