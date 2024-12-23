import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components/native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const noiseTypes: Record<string, any> = {
  white: require("./assets/white_noise.mp3"),
  brown: require("./assets/brown_noise.mp3"),
  dark: require("./assets/dark_noise.mp3"),
};

// Styled components using theme colors
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.rosewater};
  padding: 20px;
`;

const Button = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.theme.mauve};
  padding: 15px 25px;
  margin: 10px 0;
  border-radius: 10px;
  width: 80%;
`;

const ButtonText = styled(Text)`
  color: ${(props) => props.theme.text};
  font-family: Poppins_400Regular;
  font-size: 16px;
  margin-left: 10px;
`;

const NoisePlayer: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoise, setCurrentNoise] = useState<string>("white");

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async (noise: string) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      noiseTypes[noise],
      {
        isLooping: true,
      }
    );
    setSound(newSound);
    setCurrentNoise(noise);
    await newSound.playAsync();
    setIsPlaying(true);
  };

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      <Button onPress={() => playSound("white")}>
        <MaterialIcons name="waves" size={24} color="#fff" />
        <ButtonText>White Noise</ButtonText>
      </Button>
      <Button onPress={() => playSound("brown")}>
        <MaterialIcons name="grain" size={24} color="#fff" />
        <ButtonText>Brown Noise</ButtonText>
      </Button>
      <Button onPress={() => playSound("dark")}>
        <MaterialIcons name="space-dashboard" size={24} color="#fff" />
        <ButtonText>Dark Noise</ButtonText>
      </Button>
      <TouchableOpacity onPress={togglePlayback} style={{ marginTop: 20 }}>
        <MaterialIcons
          name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
          size={60}
          color={isPlaying ? "#f38ba8" : "#89b4fa"}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default NoisePlayer;
