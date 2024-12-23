import React, { useState, useRef } from "react";
import styled, { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  TouchableWithoutFeedback,
  Animated,
  Linking,
} from "react-native";

const AnimatedSquareContainer = styled(Animated.View)`
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

const AnimatedLinkButton = ({ title, href, symbol }) => {
  const [iconSize, setIconSize] = useState(0);
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    setIconSize(Math.min(width, height) * 0.69);
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    // Open the href link
    Linking.openURL(href).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <AnimatedSquareContainer
        onLayout={handleLayout}
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        <MaterialIcons name={symbol} size={iconSize} color={theme.base} />
        <BottomText>{title}</BottomText>
      </AnimatedSquareContainer>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedLinkButton;
