import React from "react";
import "../css/form.css";
import { RegisterForm } from "../components/RegisterForm";

export const Login = () => {
  return (
    <RegisterForm title={'Login'} linked={'/signup'} question={"Don't have an account? "} oppo={'Sign Up'} postUrl={'Login'}/>
  );
};
