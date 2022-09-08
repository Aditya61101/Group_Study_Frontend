import React from "react";
import '../css/form.css';
import { RegisterForm } from "../components/RegisterForm";

export const Signup = () => {
  return (
    <RegisterForm title={'Sign Up'} linked={'/login'} question={"Already have an account? "} oppo={'Login'} postUrl={'Sign Up'}/>
  );
};
