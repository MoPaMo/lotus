import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import styled, { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

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
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const isSeeking = useRef(false);
  const playlist = [
    require("./assets/lofi1.mp3"),
    require("./assets/lofi2.mp3"),
    require("./assets/lofi3.mp3"),
  ];

  useEffect(() => {
    loadSound(currentTrack);
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrack]);

  const loadSound = async (trackIndex: number) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        playlist[trackIndex],
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      if (status.isLoaded && status.durationMillis) {
        setDuration(status.durationMillis);
      }
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!isSeeking.current && status.isLoaded) {
      setPosition(status.positionMillis || 0);
      setDuration(status.durationMillis || 0);
      if (status.didJustFinish) {
        playNext();
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

  const playNext = async () => {
    const nextTrack = (currentTrack + 1) % playlist.length;
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const playPrevious = async () => {
    const prevTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
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

  const onSliderValueChange = (value: number) => {
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
          color={theme.primary}
        />
      </TouchableOpacity>
      <Controls>
        <TouchableOpacity onPress={playPrevious}>
          <MaterialIcons name="skip-previous" size={32} color={theme.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playPause}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={32}
            color={theme.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <MaterialIcons name="skip-next" size={32} color={theme.primary} />
        </TouchableOpacity>
      </Controls>
      <ProgressBar
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        onSlidingComplete={onSliderSlidingComplete}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.muted}
        thumbTintColor={theme.primary}
      />
    </Container>
  );
};

export default LofiPlayer;
