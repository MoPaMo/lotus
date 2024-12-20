import styled from "styled-components/native";

const BlobContainer = styled.View`
  background-color: ${(props) => props.theme.rosewater};
  rotate: ${(props) => props.rotate || "0deg"};
`;
