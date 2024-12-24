import NoisePlayer from "@/components/NoisePlayer";

import styled from "styled-components/native";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;
export default function NoiseView() {
  return (
    <Container>
      <NoisePlayer />
    </Container>
  );
}
