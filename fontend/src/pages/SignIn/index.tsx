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
import {useAuth} from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";
import { Link, useNavigate } from "react-router-dom";


interface SignInFormData {
  email: string;
  password: string;
}

// ================== Component SignIn Start ================== 
export function SignIn() {

  //cria o formRef que recebe uma referência do formulário do unform
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();// useNavigate é um hook do react-router-dom que permite navegar entre as páginas
  const {signIn} = useAuth(); // pega o contexto de autenticação
  const { addToast } = useToast(); // pega o contexto de toast





  const handleSubmit = useCallback(async (data: SignInFormData) => {
    // data: recebe os dados do formulário

    try {
      // limpa os erros do formulário
      formRef.current?.setErrors({}); 

      // VALIDAÇÃO DE FORMULÁRIO COM YUP https://www.npmjs.com/package/yup
      // cria uma instância do schema do yup  e passa o schema como parametro 
      const schema = Yup.object().shape({
         // cria uma propriedade email e passa sua validação com o yup
         email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
         // cria uma propriedade password e passa sua validação com o yup
         password: Yup.string().required('Senha Obrigatória'),
      });
     
      // valida o formulário com o schema e passa os dados do formulário como parametro
      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros de validação de uma vez só 
      });

      await signIn({
        email: data.email,
        password: data.password,
      })

      addToast({
        type: 'success',
        title: 'Login realizado com sucesso',
        description: 'Você já pode fazer seu pedido',
      });
      
      navigate('/dashboard'); // navega para a rota dashboard

    } catch (err: any) {
      // setErrors: seta os erros do formulário 
     
      if  (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err)); // pega os erros de validação e passa para o formulário
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
      });
      
    }

  }, [signIn, addToast]);
  
    return (
      <Container>
          <Content>
          <AnimationContainer>
          
          <img src={logo} alt="logo Go Barber" />

          <Form ref={formRef} onSubmit={ handleSubmit }>
            <h1>Faça seu Logon</h1>

            <Input icon={FiMail} name ="email" placeholder="E-mail" />
            <Input icon={FiLock} name ="password" type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
        
          </Form>
          
            <Link to="/signup"> <FiLogIn /> Criar conta</Link>

          </AnimationContainer>
          </Content>
         <Background />
        
        </Container>
    )
}
