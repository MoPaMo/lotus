import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Controls = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const ProgressBar = styled(Slider)`
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;

const LofiPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const isSeeking = useRef(false);

  useEffect(() => {
    loadSound();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      require("./assets/lofi.mp3"),
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setDuration(status.durationMillis || 0);
  };

  const onPlaybackStatusUpdate = (status: Audio.AVPlaybackStatus) => {
    if (!isSeeking.current && status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = async () => {
    if (sound) {
      const newPosition = Math.min(position + 15000, duration);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  const skipBackward = async () => {
    if (sound) {
      const newPosition = Math.max(position - 15000, 0);
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  const onSliderValueChange = async (value: number) => {
    isSeeking.current = true;
    setPosition(value);
  };

  const onSliderSlidingComplete = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
    isSeeking.current = false;
  };

  return (
    <Container>
      <TouchableOpacity onPress={playPause}>
        <MaterialIcons
          name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
          size={64}
          color={(props) => props.theme.primary}
        />
      </TouchableOpacity>
      <Controls>
        <TouchableOpacity onPress={skipBackward}>
          <MaterialIcons
            name="skip-previous"
            size={32}
            color={(props) => props.theme.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={32}
            color={(props) => props.theme.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <MaterialIcons
            name="skip-next"
            size={32}
            color={(props) => props.theme.primary}
          />
        </TouchableOpacity>
      </Controls>
      <ProgressBar
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        onSlidingComplete={onSliderSlidingComplete}
        minimumTrackTintColor={(props) => props.theme.accent}
        maximumTrackTintColor={(props) => props.theme.muted}
        thumbTintColor={(props) => props.theme.primary}
      />
    </Container>
  );
};

export default LofiPlayer;
