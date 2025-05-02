import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Breathing = () => {
  return (
    <Container>
      <div>Breathing Exercise Component</div>
    </Container>
  );
};

export default Breathing;
