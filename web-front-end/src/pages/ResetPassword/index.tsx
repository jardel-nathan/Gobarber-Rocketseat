import React, { useCallback, useRef} from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web"; // importando o Form do unform
import { FormHandles } from "@unform/core"; // importando o FormHandles do unform
import * as Yup from "yup"; // importando tudo de Yup
import getValidationErrors from "../../utils/getValidationErros"; // componete para pegar os erros de validação
import { useToast } from "../../hooks/Toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";


interface ResetPasswordFormData {
  password_confirmation: string;
  password: string;
}

// ================== Component SignIn Start ================== 
export function ResetPassword() {

  //cria o formRef que recebe uma referência do formulário do unform
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();// useNavigate é um hook do react-router-dom que permite navegar entre as páginas

  const { addToast } = useToast(); // pega o contexto de toast





  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    // data: recebe os dados do formulário

    try {
      // limpa os erros do formulário
      formRef.current?.setErrors({}); 

      // VALIDAÇÃO DE FORMULÁRIO COM YUP https://www.npmjs.com/package/yup
      // cria uma instância do schema do yup  e passa o schema como parametro 
      const schema = Yup.object().shape({
     
         password: Yup.string().required('Senha Obrigatória'),
         password_confirmation: Yup.string().required('Confirmação de Senha Obrigatória').oneOf([Yup.ref('password'), null], 'Confirmação de Senha incorreta'),   
      });
     
      // valida o formulário com o schema e passa os dados do formulário como parametro
      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros de validação de uma vez só 
      });

      const token = window.location.search.replace('?token=', ''); // pega o token da url
      console.log(token)
      if (!token) {
        throw new Error();
      }

      // chama a api para resetar a senha
     const a = await api.post('/password/reset', {password:data.password, password_confirmation:data.password_confirmation, token: token});
      console.log(a)
      addToast({
        type: 'success',
        title: 'Alteração de senha',
        description: 'Senha alterada com sucesso',
      });

      navigate('/'); // navega para a rota dashboard

    } catch (err: any) {
      // setErrors: seta os erros do formulário 
      console.log(err)
      if  (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err)); // pega os erros de validação e passa para o formulário
      }

      addToast({
        type: 'error',
        title: 'Resetar de senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
      });
      
    }

  }, [addToast]);
  
    return (
      <Container>
          <Content>
          <AnimationContainer>
          
          <img src={logo} alt="logo Go Barber" />

          <Form ref={formRef} onSubmit={ handleSubmit }>
            <h1>Resetar Senha</h1>

            <Input icon={FiLock} name ="password" type="password" placeholder="Nova Senha" />
            <Input icon={FiLock} name ="password_confirmation" type="password" placeholder="Confirme sua senha" />
            <Button type="submit">Alterar Senha</Button>

          </Form>
          
          </AnimationContainer>
          </Content>
         <Background />
        
        </Container>
    )
}
