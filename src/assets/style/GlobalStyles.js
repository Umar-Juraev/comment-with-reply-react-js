import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${({ gap }) => gap};
  margin: ${({margin})=> margin};
`;
