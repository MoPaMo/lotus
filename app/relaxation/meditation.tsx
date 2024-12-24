import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Audio } from "expo-av";
import { FontAwesome6 } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;

const Controls = styled.View`
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.yellow};
  padding: 15px;
  border-radius: 50px;
  margin: 0 10px;
`;

const TimerText = styled.Text`
  font-size: 24px;
  color: ${(props) => props.theme.text};
  margin-top: 20px;
`;

const WellDoneText = styled.Text`
  font-size: 28px;
  color: ${(props) => props.theme.text};
  margin-top: 20px;
`;

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(60); // default 1 minute
  const [remaining, setRemaining] = useState(duration);
  const [isCompleted, setIsCompleted] = useState(false);
  const meditationSound = useRef<Audio.Sound | null>(null);
  const gongSound = useRef<Audio.Sound | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (meditationSound.current) {
        meditationSound.current.unloadAsync();
      }
      if (gongSound.current) {
        gongSound.current.unloadAsync();
      }
    };
  }, []);

  const loadSounds = async () => {
    meditationSound.current = new Audio.Sound();
    await meditationSound.current.loadAsync(
      require("@/assets/meditation/meditation.mp3")
    );
    meditationSound.current.setIsMutedAsync(isMuted);

    gongSound.current = new Audio.Sound();
    await gongSound.current.loadAsync(require("@/assets/meditation/gong.mp3"));
  };

  const startMeditation = async () => {
    await loadSounds();
    setIsPlaying(true);
    setIsCompleted(false);
    setRemaining(duration);
    meditationSound.current?.playAsync();

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          meditationSound.current?.stopAsync();
          gongSound.current?.playAsync();
          setIsPlaying(false);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const toggleMute = async () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    meditationSound.current?.setIsMutedAsync(newMute);
  };

  return (
    <Container>
      {!isPlaying && !isCompleted && (
        <Text style={styles.input}>Set Time: {duration} seconds</Text>
      )}
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={(remaining / duration) * 100}
        tintColor={styles.yellow.color}
        backgroundColor="#3d5875"
      >
        {() => <TimerText>{remaining}s</TimerText>}
      </AnimatedCircularProgress>
      <Controls>
        <Button onPress={toggleMute}>
          <FontAwesome6
            name={isMuted ? "volume-xmark" : "volume-high"}
            size={24}
            color="#fff"
          />
        </Button>
        {!isPlaying && !isCompleted && (
          <Button onPress={startMeditation}>
            <FontAwesome6 name="play" size={24} color="#fff" />
          </Button>
        )}
      </Controls>
      {isCompleted && <WellDoneText>Well done</WellDoneText>}
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    color: "#fff",
  },
  yellow: {
    color: "#df8e1d",
  },
});

export default Meditation;
