import styled from 'styled-components';

const SlideButton = styled.button<{ width?: string; margin?: string }>`
  background-color: white;
  cursor: pointer;
  height: 40px;
  width: ${(props) => props.width || '130px'};
  font-size: 15px;
  font-weight: 700;
  border: 1px solid black;
  border-radius: 5px;
  margin: ${(props) => props.margin || '0'};

  /* 箱の位置をabsoluteで固定するため */
  position: relative;
  overflow: hidden;
  z-index: 1;

  /* スライドしてくる箱の定義 */
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    height: 40px;
    width: ${(props) => props.width || '130px'};
    /* 最初は左にずらしておく */
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: -1;
  }
  /* ホバーしたら箱を右にスライドする */
  &:hover::before {
    transform: none;
  }

  &:hover {
    color: white;
  }
`;

export default SlideButton;
