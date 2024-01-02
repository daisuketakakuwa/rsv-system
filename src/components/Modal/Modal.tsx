import { ReactNode } from 'react';
import styled from 'styled-components';

const Overlay = styled.div<{ show?: boolean }>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  /* 背景画像をぼやせさせる */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`;

const StyledModal = styled.div<{ show?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  transition: 0.5s all;
  opacity: ${(props) => (props.show ? '1' : '0')};
  transform: ${(props) => (props.show ? 'translateY(0px)' : 'translateY(100px)')}
    translate(-50%, -50%);
`;

type ModalProps = {
  children: ReactNode;
  show?: boolean;
  toggleModal: () => void;
};

const Modal = (props: ModalProps) => {
  const { children, show, toggleModal } = props;

  return (
    <>
      <Overlay show={show} onClick={() => toggleModal()} />
      <StyledModal show={show}>{children}</StyledModal>
    </>
  );
};

Modal.defaultProps = {
  show: false,
};

export default Modal;
