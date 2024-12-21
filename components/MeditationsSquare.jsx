import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
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
  const [iconSize, setIconSize] = useState(0);
  const theme = useTheme();

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setIconSize(Math.min(width, height) * 0.8);
  };

  return (
    <SquareContainer onLayout={handleLayout}>
      <MaterialIcons
        name="self-improvement"
        size={iconSize}
        color={theme.base}
      />
    </SquareContainer>
  );
};

export default SquareWithSymbol;
