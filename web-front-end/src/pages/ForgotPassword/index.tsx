import React, { useCallback, useRef } from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";
import { Form } from "@unform/web"; // importando o Form do unform
import { FormHandles } from "@unform/core"; // importando o FormHandles do unform
import * as Yup from "yup"; // importando tudo de Yup
import getValidationErrors from "../../utils/getValidationErros"; // componete para pegar os erros de validação
import { useAuth } from "../../hooks/Auth";
import { useToast } from "../../hooks/Toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";


interface ForgotPasswordFormData {
  email: string;
  password: string;
}

// ================== Component ForgotPassword Start ================== 
export function ForgotPassword() {

  const [loading, setLoading] = React.useState(false);

  //cria o formRef que recebe uma referência do formulário do unform
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();// useNavigate é um hook do react-router-dom que permite navegar entre as páginas

  const { addToast } = useToast(); // pega o contexto de toast





  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    // data: recebe os dados do formulário

    try {
      setLoading(true);
      // limpa os erros do formulário
      formRef.current?.setErrors({});

      // VALIDAÇÃO DE FORMULÁRIO COM YUP https://www.npmjs.com/package/yup
      // cria uma instância do schema do yup  e passa o schema como parametro 
      const schema = Yup.object().shape({
        // cria uma propriedade email e passa sua validação com o yup
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
      });

      // valida o formulário com o schema e passa os dados do formulário como parametro
      await schema.validate(data, {
        abortEarly: false, // retorna todos os erros de validação de uma vez só 
      });


      await api.post('/password/forgot', {
        email: data.email,
      })


      addToast({
        type: 'success',
        title: 'Recuperação de senha',
        description: 'Um e-mail de recuperação de senha foi enviado para você',
      });


      navigate('/dashboard'); // navega para a rota dashboard

    } catch (err: any) {
      // setErrors: seta os erros do formulário 

      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err)); // pega os erros de validação e passa para o formulário
      }

      addToast({
        type: 'error',
        title: 'Recuperação de senha',
        description: 'Erro ao recuperar a senha, tente novamente',
      });

    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>

          <img src={logo} alt="logo Go Barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha {loading ? 'carregando' : 'opa'}</h1>

            <Input icon={FiMail} name="email" placeholder="E-mail" />
            
            <Button loading={loading} type="submit">Recuperar </Button>

          </Form>

          <Link to="/signin"> <FiLogIn /> Voltar ao login</Link>

        </AnimationContainer>
      </Content>
      <Background />

    </Container>
  )
}
