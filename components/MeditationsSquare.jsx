import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Square = styled.View`
  width: 48%;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  shadow-offset: 0px 2px;
`;

const MeditationSquare = styled(Square)`
  background-color: ${(props) => props.theme.mauve};
`;

const OrangeSquare = styled(Square)`
  background-color: ${(props) => props.theme.peach};
`;

const PurpleSquare = styled(Square)`
  background-color: ${(props) => props.theme.lavender};
`;

const GreenSquare = styled(Square)`
  background-color: ${(props) => props.theme.green};
`;

const MeditationText = styled.Text`
  font-family: "Poppins";
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const SquareView = () => {
  return (
    <MeditationSquare>
      <MaterialIcons name="meditation" size={40} color="white" />
      <MeditationText>Meditation</MeditationText>
    </MeditationSquare>
  );
};

export default SquareView;
