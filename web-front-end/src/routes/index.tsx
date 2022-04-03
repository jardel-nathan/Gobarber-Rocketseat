import React from "react";
import { render } from "react-dom";
import {
  Routes,
  Route
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Profile } from "../pages/Profile";
import { ResetPassword } from "../pages/ResetPassword";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import {PrivateRoutes} from './privateRoutes';
import { PublicRoutes } from "./publicRoutes";

export const AppRoutes = () => {

  return (
   <>
   <Routes>

     <Route element={<PublicRoutes />}>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />} index={false} ></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} index={false} ></Route>
      <Route path="/reset-password" element={<ResetPassword />} index={false} ></Route>
     </Route>
     
     <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
     </Route>
    
   </Routes>
   </>
  );

};
