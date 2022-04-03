import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks/Auth";

export const PublicRoutes: React.FC = (props) => {

  // rotas publicas bloqueadas para acesso de usuarios logados
 const BLOCKED_FOR_USERS = [
    "/",
  ]

  const { user } = useAuth(); // pega o usuario do useAuth

  if(user){  
    // verifica se o caminho esta na lista de rotas bloqueadas
    if(BLOCKED_FOR_USERS.includes(window.location.pathname)){
      return <Navigate to="/dashboard" />
    }
      // rota liberada para o usuario logado
      return <Outlet />
  }

  // rota liberada para o usuario nao logado
  return <Outlet />
  
  


}