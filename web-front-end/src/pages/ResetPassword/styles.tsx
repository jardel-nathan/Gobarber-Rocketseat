import styled, {keyframes} from "styled-components";
import signInBackground from "../../assets/sign-in-background.png";
import { shade } from "polished";
export const Container = styled.div`

height: 100vh;
    display: flex;
    align-items: stretch;
 

    
`; 

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
`;


export const Background = styled.div`
 flex: 1;
 background: url(${signInBackground}) no-repeat center;
 background-size: cover;
`;

const apperFromLeft = keyframes`
from{
opacity: 0;
transform: translateX(-50px);
}
to{
opacity: 1;
transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form{
   margin: 80px 0px;
   width: 340px;
   text-align: center;
   align-items: center;
  h1{
   margin-bottom: 24px;
  }
 }

 animation: ${apperFromLeft} 1s;

 a{
   color: #f4ede8;
   display: block;
   margin-top: 24px;
   text-decoration: none;
   transition: color 0.2s;
   &:hover{
     color: ${shade(0.2, '#f4ede8')};
    }
 }

 > a{
  color: #ff9000;
   margin-top: 24px;
   text-decoration: none;
   display: flex;
   align-items: center;
   transition: color 0.2s;
   &:hover{
     color: ${shade(0.2, '#ff9000')};
    }
    svg{
     margin-right: 16px;
    }
 }
  
  `;