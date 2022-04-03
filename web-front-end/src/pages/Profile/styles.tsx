import styled, { keyframes } from "styled-components";
import { shade } from "polished";
export const Container = styled.div`



 
> header{
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #232129;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;
    
    > div{
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
      svg{
        color: #999591;
        width: 24px;
        height: 24px; 
      }

    }
  }

   
`;



export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -176px ; 

  form{
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

  h1{
   margin-bottom: 24px;
    font-size: 20px;
    text-align: left;
  }


 }
  
`

const apperFromLeft = keyframes`
from{
opacity: 0;
transform: translateX(+50px);
}
to{
opacity: 1;
transform: translateX(0);
}
`;





export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  width: 186px;
  img{
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label{
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    color: white;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    

    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    input{
      display: none;
    }
    svg{
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover{
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

