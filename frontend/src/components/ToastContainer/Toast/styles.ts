import styled, { css } from "styled-components";
import {animated} from 'react-spring';
const toastTypeVariations = {
 info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
 success: css`
    background: #e6fffa;
    color: #2e656a;
  `,
 error: css`
    background: #fddede;
    color: #c53030;
  `,
};

interface ToastProps {
 type?: "success" | "error" | "info";
 hasdescription: number;
}

export const Container = styled(animated.div)<ToastProps>`
  background: #ebf8ff;
  border-radius: 4px;
  color: #3e3b47;
  font-weight: bold;
  margin-top: 10px;
  padding: 16px 30px 16px 16px;
  position: relative;// para que o toast não fique dentro do conteúdo da página
  width: 360px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 10px;
  }

  ${(props) => toastTypeVariations[props.type || "info"]}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p{
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  strong {
    margin-left: 12px;
    font-size: 16px;
  }

  button {
   position: absolute;
   right: 16px;
   top: 16px;
   opacity: 0.6;
   border: 0;
   background: transparent;
   color: inherit;
  }

  ${(props) => !props.hasdescription && css` 
    align-items: center;
    svg {
      margin-top: 0;
    }
    button{
     top: 18px
    }
   `};

    

`;

