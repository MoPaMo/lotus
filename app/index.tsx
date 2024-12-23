// app/index.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import AnimatedLinkView from "@/components/MeditationsSquare";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
  width: 100%;
  padding: 20px;
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
        style={{ width: "100%" }}
        data={[
          {
            title: "Breathing",
            href: "/relaxation/breathing",
            symbol: "pulmonology",
          },
          { title: "LoFi", href: "/relaxation/lofi", symbol: "headphones" },
          {
            title: "White Noise",
            href: "/relaxation/whitenoise",
            symbol: "graphic_eq",
          },
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <AnimatedLinkView
            title={item.title}
            href={item.href}
            symbol={item.symbol}
          ></AnimatedLinkView>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default HomeScreen;
