import React, { createContext, useCallback, useContext, useState } from "react";
import { ToastContainer } from "../components/ToastContainer";
import * as uuid from 'uuid'

interface ToastContextData {
  addToast(message:Omit<ToastMessage, 'id'>): void;
  removeToast(id:string): void;
}

export interface ToastMessage{
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

// cia um contexto chama ToastContext para ser usado nos componentes filhos
const ToastContext = createContext<ToastContextData>({} as ToastContextData );


// cria o componente ToastProvider, children é o componente filho
export const ToastProvider: React.FC = ({ children }) => {
 
 const [messages, setMessages] = useState<ToastMessage[]>([]);


 // cria uma função para adicionar um toast
const addToastFunction = useCallback(({type, title, description}: Omit<ToastMessage, 'id'> ) => {

const id = uuid.v4();

const toast = {
 id,
 type,
 title,
 description,
};
 
// adiciona o toast no state
setMessages(messages => [...messages, toast]);

}, []);


// cria uma função para remover um toast
const removeToastFunction = useCallback((id:string) => {

 setMessages(messages => messages.filter(message => message.id !== id));

}, []);

  return (
   // context provider: informa o contexto
    <ToastContext.Provider value={{addToast:addToastFunction, removeToast:removeToastFunction}}>
      {children /* children é o componente filho, os componentes filhos podem acessar o contexto, por exemplo o ToastContainer */} 
      <ToastContainer messages={messages} /> {/* ToastContainer é o componete do toast */} 
    </ToastContext.Provider>
  );

}


export const useToast = ():ToastContextData => {
  // useContext: usa o contexto ToastContext para obter o estado do toast e as funções de adicionar e remover toast
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;

}