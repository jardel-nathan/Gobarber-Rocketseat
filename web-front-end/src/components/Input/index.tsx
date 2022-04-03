import  React, { ComponentType, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { IconBaseProps } from "react-icons/lib";
import { Container, Error } from "./styles";
import { useField } from "@unform/core"; // importando o hook useField  do unform para poder usar o hook useField que é um hook que permite que o usuário adicione um campo de formulário ao formulário do unform 
import { FiAlertCircle } from "react-icons/fi";

//  criando uma interface que herda todas as propriedades do InputHTMLAttributes e adiciona uma propriedade chamada icon e name
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: ComponentType<IconBaseProps>; // criando uma propriedade chamada icon que recebe um componente do tipo iconbaseprops do react-icons/lib
  containerStyle?: object;
}

export default function Input(props: InputProps) {
  // cria inputRef que recebe uma referência do elemento input  do html que está sendo manipulado pelo react
  const inputRef = useRef<HTMLInputElement>(null);
  // cria um estado saber se o input esta focado  e recebe o valor de false
  const [isFocused, setIsFocused] = useState(false);
  // cria um estado saber se o input esta preenchido  e recebe o valor de false
  const [isFilled, setIsFilled] = useState(false);
  // utiliza useField do unform para poder manipular o input 
  const { fieldName, error, registerField} = useField(props.name);

    useEffect(() => { 
      // registra o input no unform 
        registerField({
            name: fieldName,// nome do campo
            ref: inputRef.current, // referencia do input
            path: 'value', 
        });
    }, [fieldName, registerField]);

    const handleInputBlur = useCallback(() => {
      // se o input não estiver focado
      setIsFocused(false);
      // se o input estiver preenchido
      setIsFilled(Boolean(inputRef.current?.value));
      }, []);


    const handleInputFocus = useCallback(() => {
      // se o input estiver focado
      setIsFocused(true);
    }, []);



  return (
     <Container style={props.containerStyle} isFocused={isFocused} isFilled={isFilled}  isError={(!!error)}> {/*passa valores de parametros para o container*/}
     
        {/* se for passado um icon no input */}
        {props.icon && <props.icon size={20} />} 

        <input onFocus={() => handleInputFocus() } onBlur={() => handleInputBlur()} ref={inputRef} {...props} />
        
        {error && (
          <Error title={error}><FiAlertCircle size={20} /></Error>
          )}

     </Container>
    );

}