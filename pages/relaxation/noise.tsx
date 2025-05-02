import { useState, useEffect } from 'react';
import styled from 'styled-components';

const noiseTypes = {
  pink: '/assets/noise/pink_noise.mp3',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.base};
  padding: 20px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.mauve};
  padding: 15px 25px;
  margin: 10px 0;
  border-radius: 10px;
  width: 80%;
  color: ${(props) => props.theme.base};
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const NoiseView = () => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoise, setCurrentNoise] = useState('pink');

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const handleSelectNoise = (noise) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(noiseTypes[noise]);
    setAudio(newAudio);
    setCurrentNoise(noise);
    newAudio.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Container>
      {Object.keys(noiseTypes).map((type) => (
        <Button key={type} onClick={() => handleSelectNoise(type)}>
          {type.charAt(0).toUpperCase() + type.slice(1)} Noise
        </Button>
      ))}
      <Button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </Container>
  );
};

export default NoiseView;
