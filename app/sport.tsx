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
  color: ${(props) => props.theme.text};
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

const TopText = styled.Text`
  color: ${(props) => props.theme.green};
  margin-top: 10px;
  font-size: 16px;
  font-family: "Poppins_400Regular";
  background-color: rgba(0, 128, 0, 0.2);
  padding-bottom: 16px;
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
    icon: "mountain",
  },
  { name: "Yoga", link: null, icon: "spa" },
  { name: "Laufen", link: null, icon: "person-running" },
  { name: "Radfahren", link: null, icon: "person-biking" },
  {
    name: "Schwimmen",
    link: "https://www.berlinerbaeder.de/baeder/",
    icon: "person-swimming",
  },
  { name: "Pilates", link: null, icon: "person-falling" },
  { name: "HIIT", link: null, icon: "dumbbell" },

  {
    name: "Tischtennis",
    link: "https://www.google.com/maps/search/tischtennis+platte",
    icon: "table-tennis-paddle-ball",
  },
  {
    name: "Tennis",
    link: "https://www.google.com/maps/search/tennis+platz",
    icon: "baseball",
  },
  {
    name: "Basketball",
    link: "https://www.google.com/maps/search/basketball+platz",
    icon: "basketball",
  },
  {
    name: "Fußball",
    link: "https://www.google.com/maps/search/fußball+platz",
    icon: "futbol",
  },
  {
    name: "Volleyball",
    link: "https://www.google.com/maps/search/volleyball+sporthalle",
    icon: "volleyball",
  },
  {
    name: "Handball",
    link: "https://www.google.com/maps/search/handball",
    icon: "volleyball",
  },
  {
    name: "Rugby",
    link: "https://www.google.com/maps/search/rugby",
    icon: "football",
  },
  {
    name: "Skateboarding",
    link: "https://www.google.com/maps/search/skatepark",
    icon: "city",
  },
  {
    name: "Skiing",
    link: "https://www.google.com/maps/search/skigebiet",
    icon: "person-skiing",
  },
  {
    name: "Snowboarding",
    link: "https://www.google.com/maps/search/snowboarding+park",
    icon: "person-snowboarding",
  },
  {
    name: "Klettern",
    link: "https://www.google.com/maps/search/kletterhalle",
    icon: "mountain",
  },
  {
    name: "Badminton",
    link: "https://www.google.com/maps/search/badminton+halle",
    icon: "badminton",
  },
  {
    name: "Golf",
    link: "https://www.google.com/maps/search/golfplatz",
    icon: "golf-ball-tee",
  },
  {
    name: "Boxen",
    link: "https://www.google.com/maps/search/boxhalle",
    icon: "mitten",
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
    icon: "chess",
  },

  {
    name: "Reiten",
    link: "https://www.google.com/maps/search/reitställe",
    icon: "horse",
  },
  {
    name: "Triathlon",
    link: null,
    icon: "person-swimming",
  },
  {
    name: "Surfen",
    link: "https://www.google.com/maps/search/surfspots",
    icon: "water",
  },

  {
    name: "Eishockey",
    link: "https://www.google.com/maps/search/eishockey+hallen",
    icon: "hockey-puck",
  },

  {
    name: "Parkour",
    link: null,
    icon: "person-running",
  },
];

const SportView = () => {
  const [suggestion, setSuggestion] = useState<{
    name: string;
    link: string | null;
    icon: string | null;
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
        <TopText>
            Finde eine Sportart
        </TopText>
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
          <SuggestionText>
            {" "}
            <FontAwesome6 icon={suggestion.icon} size="18" color="#fff" />
            {suggestion.name}
          </SuggestionText>
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
