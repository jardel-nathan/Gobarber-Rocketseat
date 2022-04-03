import React  from "react";

import { Container } from "./styles";

interface TooltipProps {
  title: string;
  className?: string; // necessario para o styled component passar o className para o elemento Container 
}

const Tooltip = (props:any) => { 
  const {title, className}:TooltipProps = props;
  return (
  <Container className={className}>
     {props.children}
     <span>{title}</span>
  </Container>
  );
          
  
  }

  export default Tooltip;