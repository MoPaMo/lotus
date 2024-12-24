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
    name: "Bouldern",
    link: "https://www.google.com/maps/search/boulder+halle",
  },
  { name: "Yoga", link: null },
  { name: "Laufen", link: null },
  { name: "Radfahren", link: null },
  { name: "Schwimmen", link: "https://www.berlinerbaeder.de/baeder/" },
  { name: "Pilates", link: null },
  { name: "HIIT", link: null },
  {
    name: "Tennis",
    link: "https://www.google.com/maps/search/tennis+platz",
  },
  {
    name: "Basketball",
    link: "https://www.google.com/maps/search/basketball+platz",
  },
  {
    name: "Fußball",
    link: "https://www.google.com/maps/search/fußball+platz",
  },
  {
    name: "Volleyball",
    link: "https://www.google.com/maps/search/volleyball+sporthalle",
  },
  {
    name: "Handball",
    link: "https://www.google.com/maps/search/handball",
  },
  {
    name: "Rugby",
    link: "https://www.google.com/maps/search/rugby",
  },
  {
    name: "Skateboarding",
    link: "https://www.google.com/maps/search/skatepark",
  },
  {
    name: "Skiing",
    link: "https://www.google.com/maps/search/skigebiet",
  },
  {
    name: "Snowboarding",
    link: "https://www.google.com/maps/search/snowboarding+park",
  },
  {
    name: "Klettern",
    link: "https://www.google.com/maps/search/kletterhalle",
  },
  {
    name: "Badminton",
    link: "https://www.google.com/maps/search/badminton+halle",
  },
  {
    name: "Golf",
    link: "https://www.google.com/maps/search/golfplatz",
  },
  {
    name: "Boxen",
    link: "https://www.google.com/maps/search/boxhalle",
  },
  {
    name: "Karate",
    link: "https://www.google.com/maps/search/karate+vereine",
  },
  {
    name: "Taekwondo",
    link: "https://www.google.com/maps/search/taekwondo+vereine",
  },
  {
    name: "Judo",
    link: "https://www.google.com/maps/search/judo+vereine",
  },
  {
    name: "Schach",
    link: null,
  },

  {
    name: "Reiten",
    link: "https://www.google.com/maps/search/reitställe",
  },
  {
    name: "Triathlon",
    link: null,
  },
  {
    name: "Surfen",
    link: "https://www.google.com/maps/search/surfspots",
  },
  {
    name: "Lacrosse",
    link: "https://www.google.com/maps/search/lacrosse+felder",
  },
  {
    name: "Eishockey",
    link: "https://www.google.com/maps/search/eishockey+hallen",
  },
  {
    name: "Skaten",
    link: "https://www.google.com/maps/search/skateparks",
  },
  {
    name: "Parkour",
    link: null,
  },
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
              <FontAwesome6 name="magnifying-glass-location" /> In der Nähe
              finden
            </LinkText>
          )}
        </>
      )}
    </Container>
  );
};

export default SportView;
