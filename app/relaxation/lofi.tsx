import LofiPlayer from "@/components/LoFiPlayer";
import styled from "styled-components/native";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.base};
`;
export default function Lofi() {
  return (
    <Container>
      <LofiPlayer />
    </Container>
  );
}
