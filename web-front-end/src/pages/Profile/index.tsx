import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import { Container, Content, AvatarInput } from "./styles";

import Button from "../../components/Button/button";
import Input from "../../components/Input";
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import * as Yup from "yup";

import getValidationErrors from "../../utils/getValidationErros";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";


interface ProfileFormData {
  email: string;
  password: string;
  name: string;
  old_password: string;
  password_confirmation: string;

}
export function Profile() {

  const { user, updateUser } = useAuth()
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState(user.name)
  const [emailValue, setEmailValue] = useState(user.email)


  const handleSubmit = useCallback(async (data: ProfileFormData) => {

    try {
      formRef.current?.setErrors({});
      // VALIDAÇÃO DE FORMULÁRIO COM YUP https://www.npmjs.com/package/yup
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().required("E-mail obrigatório").email("Digite um e-mail válido"),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: string) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: (val: string) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta')

      });

      await schema.validate(data, {
        abortEarly: false,
      });


      const { name, email, old_password, password, password_confirmation } = data;
      const formData = {
        name,
        email,
        ...(old_password ? { old_password, password, password_confirmation } : {})
      }


      const response = await api.put('/profile/update', formData);

      updateUser(response.data);
      navigate('/dashboard');
      addToast({
        type: 'success',
        title: 'Atualização de perfil',
        description: 'Perfil atualizado com sucesso'
      });

    } catch (err: any) {
      formRef.current?.setErrors(getValidationErrors(err));

      addToast({
        type: 'error',
        title: 'Atualização de perfil',
        description: 'Erro ao atualizar perfil, confira seus dados'
      });
    }


  }, [navigate, addToast]);

  const handleAvatarChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    user.avatar_url = 'https://gobarberjardev.s3.amazonaws.com/f9ebd7ff6c7cf7090ae0-8ee1e419632fcd2e0ebf3de12f01d36c.jpg'
    if (e.target.files) {
      const data = new FormData();
      data.append('avatar', e.target.files[0]);


      api.patch('/users/avatar', data).then(async response => {
        console.log(response.data)


        updateUser(response.data)


        addToast({
          type: 'success',
          title: 'Avatar atualizado'
        });
      });



    }
  }, []);


  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>


        <Form ref={formRef} onSubmit={handleSubmit}>

          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label>
              <FiCamera />
              <input type="file" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" value={nameValue} onChange={(e)=>{setNameValue(e.target.value)}} />
          <Input icon={FiMail} name="email" placeholder="E-mail" value={emailValue} onChange={(e)=>{setEmailValue(e.target.value)}} />
          <Input type='password' containerStyle={{ marginTop: 24 }} icon={FiLock} name="old_password" placeholder="Senha atual" />
          <Input type='password' icon={FiLock} name="password" placeholder="Nova Senha" />
          <Input type='password' icon={FiLock} name="password_confirmation" placeholder="Confirmar Senha" />


          <Button type="submit">Confirmar mudanças</Button>

        </Form>



      </Content>


    </Container>
  )
}