import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

// criando um tipo chamado ButtonProps que herda todas as propriedades do ButtonHTMLAttributes
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
 loading?: boolean;
};

export default function Button({children, loading, ...rest}: ButtonProps) {

return (

 <Container >

 {/* passa todas as propriedades de ButtonProps para o elemento button */}
 <button {...rest} >

  {/* se loading for true, mostra o ícone de loading */}
  {loading? 'Carregando...' : children}
 
  
  </button>

 </Container>

);

}