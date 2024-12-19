// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background};
`;

const ThemedText = styled.Text`
  color: ${(props) => props.theme.text};
`;

const HomeScreen = () => {
  return (
    <Container>
      <ThemedText>Hello, Catppuccin!</ThemedText>
    </Container>
  );
};

export default HomeScreen;
