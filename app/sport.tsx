import React, { useState, useEffect } from "react";
import { Linking, TouchableOpacity, Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { FontAwesome6 } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;

const AnimatedBall = styled(Animated.View)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.green};
  justify-content: center;
  align-items: center;
  shadow-color: #008000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.3;
  shadow-radius: 4.65px;
  elevation: 8;
`;

const SuggestionText = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  font-family: "Poppins_900Black";
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 15px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

const LinkText = styled.Text`
  color: ${(props) => props.theme.green};
  margin-top: 10px;
  font-size: 16px;
  font-family: "Poppins_400Regular";
  background-color: rgba(0, 128, 0, 0.2);
  padding: 8px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 1;
  }
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
  elevation: 2;
`;

const sports = [
  {
    name: "Bouldering",
    link: "https://www.google.com/maps/search/bouldering+gym",
  },
  { name: "Yoga", link: null },
  { name: "Running", link: null },
  { name: "Cycling", link: null },
  { name: "Swimming", link: null },
  {
    name: "Rock Climbing",
    link: "https://www.google.com/maps/search/rock+climbing+gym",
  },
  { name: "Pilates", link: null },
  { name: "HIIT", link: null },
];

const SportView = () => {
  const [suggestion, setSuggestion] = useState<{
    name: string;
    link: string | null;
  } | null>(null);

  const animatedValue = useState(new Animated.Value(1))[0];

  const getRandomSport = () => {
    const randomSport = sports[Math.floor(Math.random() * sports.length)];
    setSuggestion(randomSport);

    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 150,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Container>
      <TouchableOpacity onPress={getRandomSport}>
        <AnimatedBall
          style={{
            transform: [{ scale: animatedValue }],
          }}
        >
          <FontAwesome6 name="dice" size={64} color="#fff" />
        </AnimatedBall>
      </TouchableOpacity>
      {suggestion && (
        <>
          <SuggestionText>{suggestion.name}</SuggestionText>
          {suggestion.link && (
            <LinkText onPress={() => openLink(suggestion.link)}>
              <FontAwesome6 name="magnifying-glass-location" /> Find Nearby
              Facilities
            </LinkText>
          )}
        </>
      )}
    </Container>
  );
};

export default SportView;