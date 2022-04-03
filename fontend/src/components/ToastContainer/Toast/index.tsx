import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { Container } from './styles'
import { ToastMessage, useToast } from "../../../hooks/Toast";

interface ToastProps {
    dataToast: ToastMessage;
    style: object;
}

export const TIMER_DURATION_TOAST = 3000;

export const Toast = ({ dataToast, style }:ToastProps) => {

    const [toastOnMouseOver, setToastOnMouseOver] = useState(false); // estado que controla a exibição do toast quando o mouse estiver sobre ele
 
    const icons = {
        info:<FiInfo size={24}/>,
        success:<FiCheckCircle size={24} />,
        error:<FiAlertCircle size={24}/>
    }


// removeToast é uma função que recebe um id e remove o toast do state
const {removeToast} = useToast();
const handleRemoveToast = useCallback((id:string) => {
    removeToast(id);
}, [removeToast]);


const time = useCallback(() => {
    const time = setTimeout(() => {
        if(!toastOnMouseOver){ // se o mouse não estiver sobre o toast, remove o toast
            handleRemoveToast(dataToast.id);  
        } 
    }, TIMER_DURATION_TOAST);
    return () => {
        clearTimeout(time);
    }
}, [toastOnMouseOver, handleRemoveToast, dataToast] );

useEffect(time, [time]);



return (
    <>
    <Container 
    onMouseOver={()=> {setToastOnMouseOver(true)}}
    onMouseLeave={()=> {setToastOnMouseOver(false)}}
    type={dataToast.type}
    hasdescription={Number(!!dataToast.description)}
    style={style}
    >

    { dataToast.type && icons[dataToast.type || 'info']  }

    <div>
        <strong>{dataToast.title}</strong>
        <p> {dataToast.description && dataToast.description} </p>
    </div>

    {/* A arrow function é necessário pois sem ela a função iria executar logo após a renderização do elemento */}
    <button onClick={() => {handleRemoveToast(dataToast.id)}} type='button'>
        <FiXCircle size={18} />
    </button>
  </Container>
  </>
)

}