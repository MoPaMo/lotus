import { View, Text } from "react-native";
import styled from "styled-components/native";
import BreathingExercise from "@/components/BreathingExcercise";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
  width: 100%;
  height: 100%;
  overflow: hidden;
`;


const Breathing = () => {
  return (
    <Container>
      <BreathingExercise cycles={3} />
    </Container>
  );
};

export default Breathing;