import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components/native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const noiseTypes: Record<string, any> = {
  /*white: require("./assets/white_noise.mp3"),
  brown: require("./assets/brown_noise.mp3"),
  dark: require("./assets/dark_noise.mp3"),*/
  pink: require("@/assets/noise/pink_noise.mp3"),
};

// Styled components using theme colors
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
  padding: 20px;
  height: 100%;
  width: 100%;
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
  color: ${(props) => props.theme.base};
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

  useEffect(() => {
    return () => {
      // Stop playing noise on exit
      if (sound) {
        sound.stopAsync();
      }
    };
  }, []);

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

  const handleSelectNoise = async (noise: string) => {
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

  const togglePlayPause = async () => {
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
      {Object.keys(noiseTypes).map((type) => (
        <Button key={type} onPress={() => handleSelectNoise(type)}>
          <MaterialIcons name="music-note" size={24} color="white" />
          <ButtonText>
            {type.charAt(0).toUpperCase() + type.slice(1)} Noise
          </ButtonText>
        </Button>
      ))}
      <Button onPress={togglePlayPause}>
        <MaterialIcons
          name={isPlaying ? "pause" : "play-arrow"}
          size={24}
          color="white"
        />
        <ButtonText>{isPlaying ? "Pause" : "Play"}</ButtonText>
      </Button>
    </Container>
  );
};

export default NoisePlayer;
