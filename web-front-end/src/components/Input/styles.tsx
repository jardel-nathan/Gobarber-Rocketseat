import styled, { css }  from "styled-components";
import Tooltip from "../Tooltip";


interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`

 background: #232129;
 border: 2px solid #232129;
 border-radius: 10px;
 height: 44px;
 padding: 16px;
 width: 100%;
 color: #f4ede8;
 display: flex;
 align-items: center;
 transition: border-color 0.4s;

 & + div{
  margin-top: 8px;
 }


 svg{
    margin-right: 16px;
    color: ${props => (props.isFilled)?  '#ff9000' : '#666360'};
    transition: color 0.4s;
   }


   ${props => props.isError && css`
   border-color: #d11818;
 `}


 ${props => props.isFocused && css`
  svg{
   color: #ff9000!important;
   }
   border-color: #ff9000;
 `}



input{
  background: transparent;
  border: 0;
  color: #f4ede8;
  
   & + input{
    margin-top: 8px;
   }

   &::placeholder{
    color: #666360;

   }

  }


`;


export const Error = styled(Tooltip)` // criando um componente styled chamado error que herda o componente Tooltip
height: 20px;
margin-left: 16px;
svg{
  margin: 0px;
}
span{
  background: #d11818;
  color: #fff;
  &::before{
    border-color: #d11818 transparent;
  }

}

`;