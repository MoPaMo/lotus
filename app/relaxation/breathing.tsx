import { View, Text } from "react-native";
import styled from "styled-components/native";
import BreathingExercise from "@/components/BreathingExcercise";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;


const Breathing = () => {
  return (
    <Container>
      <BreathingExercise cycles={3} />
    </Container>
  );
};

export default Breathing;