import React from 'react';
import { Toast } from './Toast';
import { Container } from './styles';
import {ToastMessage} from '../../hooks/Toast';
import { useTransition } from 'react-spring';



export interface ToastContainerProps {
  messages: ToastMessage[]; // array de ToastMessage
}

export const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {




const messagesWithTransitions = useTransition(messages, {
 keys: (message) => message.id,
 from: { right: '-120%', opacity:0},
 enter: { right: '0%', opacity:1 },
 leave: { right: '-120%', opacity:0 },
});
 



  return (
    <Container>

    {messagesWithTransitions((style, item, prop) => (
     <Toast 
     key={prop.key}
     dataToast = {item}
     style = {style}
     ></Toast> 
    ))}
     
     

    </Container>
  );

}