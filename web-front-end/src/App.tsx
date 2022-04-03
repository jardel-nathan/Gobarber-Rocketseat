import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks'; 
import { AppRoutes } from './routes';
import { GlobalStyle } from './style/global'; //estilo global utilizando o styled component



function App() {
  return (
    
    <BrowserRouter>
      
      <AppProvider>
        <AppRoutes />
      </AppProvider>

      {/* Estilos Globais*/}
      <GlobalStyle />
    
    </BrowserRouter>
    
  );


}

export default App;
