import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const AnimatedSquareContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme[props.customColor]};
  padding: 16px;
  border-radius: 16px;
  margin: 8px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const BottomText = styled.div`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.base};
  position: absolute;
  bottom: 16px;
`;

const MeditationsSquare = ({ title, href, symbol, color = 'surface0' }) => {
  const [iconSize, setIconSize] = useState(0);
  const scaleAnim = useRef(1);
  const router = useRouter();

  const handleLayout = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    setIconSize(Math.min(width, height) * 0.5);
  };

  const handlePressIn = () => {
    scaleAnim.current = 0.95;
  };

  const handlePressOut = () => {
    scaleAnim.current = 1;
    router.push(href);
  };

  return (
    <AnimatedSquareContainer
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onMouseLeave={handlePressOut}
      onLayout={handleLayout}
      customColor={color}
      style={{ transform: `scale(${scaleAnim.current})` }}
    >
      <i className={`fa fa-${symbol}`} style={{ fontSize: iconSize, color: 'white' }} />
      <BottomText>{title}</BottomText>
    </AnimatedSquareContainer>
  );
};

export default MeditationsSquare;
