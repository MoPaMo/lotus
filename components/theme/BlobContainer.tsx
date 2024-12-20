import styled from "styled-components/native";

interface BlobContainerProps {
  rotate?: number;
}

const BlobContainer = styled.View<BlobContainerProps>`
  background-color: ${(props) => props.theme.rosewater};
  rotate: ${(props) => (props.rotate || "0") + "deg"};
`;
