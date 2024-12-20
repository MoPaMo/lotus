// app/index.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import SquareView from "@/components/MeditationsSquare";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;

const ThemedText = styled.Text`
  color: ${(props) => props.theme.text};
`;
const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const HomeScreen = () => {
  return (
    <Container>
      <FlatList
        data={[
          { text: "First" },
          { text: "Second" },
          { text: "Third" },
          { text: "Fourth" },
        ]}
        numColumns={2}
        renderItem={({ item }) => <SquareView></SquareView>}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default HomeScreen;
