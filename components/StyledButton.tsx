import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #04a5e5;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0284c7;
  }
`;

export default StyledButton;
