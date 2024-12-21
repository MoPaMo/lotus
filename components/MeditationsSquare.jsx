import React from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const SquareContainer = styled.View`
  flex: 1;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.pink};
  padding: 16px;
  border-radius: 16px;
  margin: 8px;
`;

const SquareWithSymbol = () => {
  return (
    <SquareContainer>
      <MaterialIcons name="self-improvement" size={48} color="#FFFFFF" />
    </SquareContainer>
  );
};

export default SquareWithSymbol;
