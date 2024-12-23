import styled from "styled-components/native";

const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.sky};
  padding: 20px; 
  border-radius: 15%; 
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8; 
  align-items: center;
  justify-content: center;
  margin: 10px; 
  transform: scale(1); 

  &:active {
    transform: scale(0.95);
  }
`;

export default StyledButton;
