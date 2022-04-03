
// hook for auth context
// este hooke é usado para obter o estado de autenticação do usuário e seus dados assim como o contexto de autenticação
import React, { FC, useCallback, useContext, useState } from "react";
import { createContext } from "react";
import api from "../services/api"; // importando a api do backend

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState { // cria uma interface para o estado de autenticação
  token: string;
  user: User;
}


interface SignInCredentials { // cria uma interface para as credenciais de autenticação
  email: string;
  password: string;
}


interface AuthContextData { //  cria um interface para o contexto de autenticação
  user: User;
  signIn(credentials:SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

//  cria o contexto de autenticação com o estado e as funções
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

  
//  cria o componente AuthProvider que recebe o estado de autenticação e as funções
export const AuthProvider: FC = ({ children }) => {



  const [data, setData] = useState<AuthState>(() => {
    // pega o token do localStorage
    const token = localStorage.getItem("@GoBarber:token");
    api.defaults.headers.common['Authorization'] = 'Bearer '+token; // adiciona o token no header da api de forma padrão
    // pega o user do localStorage
    const user = localStorage.getItem("@GoBarber:user");
      //  se o token existir e o user também existir
    if (token && user) {
      //  retorna o token e o user como valor do state
      return { token, user: JSON.parse(user) };
    }
    // se não retorna objeto vazio
    return {} as AuthState;
  }  
  );

  //  funcao que faz o login, recebe as credenciais e retorna uma promisse  de autenticação 
  const signIn = useCallback( async ({email, password}) => {
    //  faz a requisição para o backend
    const response = await api.post('/sessions', {
      email,
      password,
    });
    // pega o token e o user do response
    const {token, user} = response.data;
    // salva o token e o user no local storage
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    api.defaults.headers.common['Authorization'] = 'Bearer '+token;

    setData({token, user});
  }, []);

  

  const signOut = useCallback(() => {
    // remove from local storage
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')
    setData({} as AuthState); // seta o state como vazio
  }, []);


  const updateUser = useCallback( (user: User) => {
    
      setData({
        token: data.token,
        user,
      });
      
      localStorage.setItem('@GoBarber:user', JSON.stringify(user));

  }, [setData, data.token]);



  return ( 
  <AuthContext.Provider 
  value={
   { user:data.user, 
   signIn,
   signOut,
   updateUser
  }
 }>
  {children}
  </AuthContext.Provider>
  );

 };

 // cria uma função para retornar o contexto de autenticação de forma mais simples para os componentes
 export const useAuth = (): AuthContextData => {
    
  const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
 
  }


