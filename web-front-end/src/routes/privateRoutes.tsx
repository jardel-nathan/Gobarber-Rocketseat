import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../hooks/Auth";

export const PrivateRoutes: React.FC = () => {

const { user } = useAuth();

  return (
    <>
      { user ? <Outlet /> : <Navigate to="/" />  }
    </>
  );

}