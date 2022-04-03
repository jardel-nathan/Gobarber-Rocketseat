import React, { useCallback, useRef } from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import { FiArrowLeft, FiLock, FiMail, FiUser } from "react-icons/fi";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErros";

import  { FormHandles } from "@unform/core";
import  { Form} from "@unform/web";
import api from "../../services/api";
import { useToast} from "../../hooks/Toast";
import { useNavigate } from "react-router-dom";


interface SignUpFormData {
  email: string;
  password: string;
}
export function SignUp() {
  
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    
    try {
      formRef.current?.setErrors({});
      // VALIDAÇÃO DE FORMULÁRIO COM YUP https://www.npmjs.com/package/yup
      const schema = Yup.object().shape({
         name: Yup.string().required("Nome obrigatório"),
         email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
         password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });
     
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      addToast({
          type: 'success',
          title: 'Cadastro',
          description:'Cadastro realizado com sucesso'
      });

      navigate('/');

    } catch (err: any) {
      formRef.current?.setErrors(getValidationErrors(err));
    }


  }, [navigate, addToast]);



    return (
        <Container>
          <Background />
          <Content>
          <AnimationContainer>
         <img src={logo} alt="logo Go Barber" />

         <Form ref={formRef} onSubmit={ handleSubmit }>
          <h1>Faça seu Cadastro</h1>

          <Input icon={FiUser} name ="name" placeholder="Nome" />
          <Input icon={FiMail} name ="email" placeholder="E-mail" />
          <Input icon={FiLock} name ="password" type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>

          </Form>
         
          <a href="/"> <FiArrowLeft /> Voltar para logon</a>
          </AnimationContainer>
         </Content>
         
        
        </Container>
    )
}