import { ReactNode } from 'react';

type LoginButtonProps = {
  children: ReactNode;
};

const LoginButton = (props: LoginButtonProps) => {
  return (
    <div>
      <button
        style={{
          backgroundColor: 'white',
          border: '1px solid silver',
          borderRadius: '10px',
          color: 'gray',
          cursor: 'pointer',
          padding: '10px 30px',
          margin: '10px',
          fontSize: '15px',
        }}>
        {props.children}
      </button>
    </div>
  );
};

export default LoginButton;
