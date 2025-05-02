import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.base};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.yellow};
  padding: 15px;
  border-radius: 50px;
  margin: 0 10px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
`;

const TimerText = styled.div`
  font-size: 24px;
  color: ${(props) => props.theme.text};
  margin-top: 20px;
`;

const WellDoneText = styled.div`
  font-size: 28px;
  color: ${(props) => props.theme.text};
  margin-top: 20px;
`;

const DurationSetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.text};
`;

const Input = styled.input`
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;

const Label = styled.label`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(60);
  const [remaining, setRemaining] = useState(duration);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startMeditation = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsCompleted(false);
    setRemaining(duration);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopMeditation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
    setRemaining(duration);
  };

  const pauseMeditation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(true);
    setIsPlaying(false);
  };

  const cancelMeditation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPlaying(false);
    setIsPaused(false);
    setRemaining(duration);
  };

  const restartMeditation = () => {
    stopMeditation();
    startMeditation();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Container>
      {!isPlaying && !isPaused && (
        <DurationSetter>
          <Label>Dauer einstellen:</Label>
          <Input
            type="range"
            min="30"
            max="3600"
            step="10"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <div>
            {duration >= 60
              ? `${Math.floor(duration / 60)}m ${duration % 60}s`
              : `${duration}s`}
          </div>
        </DurationSetter>
      )}
      <div>
        <TimerText>
          {remaining >= 60
            ? `${Math.floor(remaining / 60)}m ${remaining % 60}s`
            : `${remaining}s`}
        </TimerText>
      </div>
      <Controls>
        <Button onClick={toggleMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </Button>
        {!isPlaying && !isPaused && !isCompleted && (
          <Button onClick={startMeditation}>Start</Button>
        )}
        {isPlaying && (
          <>
            <Button onClick={pauseMeditation}>Pause</Button>
            <Button onClick={cancelMeditation}>Stop</Button>
          </>
        )}
        {isPaused && (
          <Button onClick={startMeditation}>Resume</Button>
        )}
      </Controls>
      {isCompleted && <WellDoneText>Well done</WellDoneText>}
    </Container>
  );
};

export default Meditation;
