// app/index.tsx
import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import ThemeWrapper from "@/components/theme/ThemeWrapper";
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

const App = () => {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <ThemeWrapper>
          <Container>
            <ThemedText>Hello, Catppuccin!</ThemedText>
          </Container>
        </ThemeWrapper>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
