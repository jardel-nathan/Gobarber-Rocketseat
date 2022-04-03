import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute; // position absolute para que o toast não fique dentro do conteúdo da página
  right: 0;
  top: 0;
  padding: 30px;
  z-index: 9999;
  overflow: hidden;
`;

