// app/index.tsx
import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import BlobContainer from "@/components/theme/BlobContainer";
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;

const ThemedText = styled.Text`
  color: ${(props) => props.theme.text};
`;

const HomeScreen = () => {
  return (
    <Container>
      <ThemedText>Hello, Catppuccin!</ThemedText>
      <BlobContainer>
        <Text>Hi</Text>
      </BlobContainer>
    </Container>
  );
};

export default HomeScreen;
