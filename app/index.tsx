// app/index.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import AnimatedLinkView from "@/components/MeditationsSquare";
import { FontAwesome6 } from "@expo/vector-icons";
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
const Head = styled.Text`
  font-size: 24px;
  font-family: "Poppins_900Black";
  color: ${(props) => props.theme.text};
  margin-bottom: 20px;
`;

const HomeScreen = () => {
  return (
    <Container>
    <Head>
       <FontAwesome6 name="spa" size={24} />{" "}Lotus
    </Head>
      <FlatList
        style={{ width: "100%" }}
        data={[
          {
            title: "Atmen",
            href: "/relaxation/breathing",
            symbol: "lungs",
            color: "pink",
          },
          {
            title: "LoFi",
            href: "/relaxation/lofi",
            symbol: "headphones",
            color: "blue",
          },
          {
            title: "White Noise",
            href: "/relaxation/noise",
            symbol: "wave-square",
            color: "mauve",
          },
          {
            title: "Sport",
            href: "/sport",
            symbol: "broom-ball",
            color: "green",
          },
          {
            title: "54321",
            href: "/relaxation/54321",
            symbol: "list-ol",
            color: "red",
          },
          {
            title: "Meditation",
            href: "/relaxation/meditation",
            symbol: "om",
            color: "yellow",
          },
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <AnimatedLinkView
            title={item.title}
            href={item.href}
            symbol={item.symbol}
            color={item.color}
          ></AnimatedLinkView>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default HomeScreen;
