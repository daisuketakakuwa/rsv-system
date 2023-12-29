import { ReactNode, useEffect, useState } from 'react';
import { HIDE_MENU_BUTTONS_PAGES } from '../../utils/constants';
import SlideButton from '../styles/SlideButton';

type LayoutProps = {
  children: ReactNode;
};

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const [showMenuButtons, setShowMenuButtons] = useState(true);
  useEffect(() => {
    setShowMenuButtons(!HIDE_MENU_BUTTONS_PAGES.includes(window.location.pathname));
  }, [window.location.pathname]);

  return (
    <div style={{ position: 'relative', height: '100%' }}>
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
          {showMenuButtons && (
            <>
              <SlideButton margin="0px 10px">Mypage</SlideButton>
              <SlideButton margin="0px 50px">ログイン</SlideButton>
            </>
          )}
        </div>
      </div>

      <div style={{ width: '100%', height: '100%', position: 'absolute', top: '100px', left: '0' }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
