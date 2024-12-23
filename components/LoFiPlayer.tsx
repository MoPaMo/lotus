// LofiPlayer.js
import React, { useState, useEffect, useRef } from "react";
import { View, Image } from "react-native";
import Slider from "@react-native-community/slider";
import styled, { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";
import StyledButton from "./StyledButton";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.base};
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
  width: 100%;
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

const CoverImage = styled.Image`
  width: 75vw;
  height: 75vw;
  border-radius: 20px;
`;

const LofiPlayer = () => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const isSeeking = useRef(false);
  const playlist = [
    {
      audio: require("@/assets/lofi/1.mp3"),
      image: require("@/assets/lofi-img/1.jpg"),
    },
    {
      audio: require("@/assets/lofi/2.mp3"),
      image: require("@/assets/lofi-img/2.jpg"),
    },
    {
      audio: require("@/assets/lofi/3.mp3"),
      image: require("@/assets/lofi-img/3.jpg"),
    },
    {
      audio: require("@/assets/lofi/4.mp3"),
      image: require("@/assets/lofi-img/4.jpg"),
    },
    {
      audio: require("@/assets/lofi/5.mp3"),
      image: require("@/assets/lofi-img/5.jpg"),
    },
    {
      audio: require("@/assets/lofi/6.mp3"),
      image: require("@/assets/lofi-img/6.jpg"),
    },
    {
      audio: require("@/assets/lofi/7.mp3"),
      image: require("@/assets/lofi-img/7.jpg"),
    },
    {
      audio: require("@/assets/lofi/8.mp3"),
      image: require("@/assets/lofi-img/8.jpg"),
    },
    {
      audio: require("@/assets/lofi/9.mp3"),
      image: require("@/assets/lofi-img/9.jpg"),
    },
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
        playlist[trackIndex].audio,
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
      <CoverImage source={playlist[currentTrack].image} />
      <ProgressBar
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={onSliderValueChange}
        onSlidingComplete={onSliderSlidingComplete}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.muted}
        thumbTintColor={theme.sky}
      />
      <Controls>
        <StyledButton onPress={playPrevious}>
          <MaterialIcons name="skip-previous" size={32} color={theme.base} />
        </StyledButton>

        <StyledButton onPress={playPause}>
          <MaterialIcons
            name={isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={64}
            color={theme.base}
          />
        </StyledButton>

        <StyledButton onPress={playNext}>
          <MaterialIcons name="skip-next" size={32} color={theme.base} />
        </StyledButton>
      </Controls>
    </Container>
  );
};

export default LofiPlayer;
