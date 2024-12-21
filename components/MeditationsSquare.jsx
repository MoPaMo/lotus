import React, { useState } from "react";
import styled, { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

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

const BottomText = styled(Text)`
  font-family: "Poppins_400Regular";
  font-size: 16px;
  color: ${(props) => props.theme.base};
  position: absolute;
  bottom: 16px;
`;

const SquareWithSymbol = () => {
  const [iconSize, setIconSize] = useState(0);
  const theme = useTheme();

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setIconSize(Math.min(width, height) * 0.69);
  };

  return (
    <SquareContainer onLayout={handleLayout}>
      <MaterialIcons
        name="self-improvement"
        size={iconSize}
        color={theme.base}
      />
      <BottomText>Meditation</BottomText>
    </SquareContainer>
  );
};

export default SquareWithSymbol;
