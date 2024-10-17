import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div id="login">
      <LoginForm />
    </div>
  );
};
