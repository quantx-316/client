import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
//@ts-ignore
import  { Form, Input, CheckButton } from "react-validation";
import  isEmail  from "validator";

import { connect } from "react-redux";
import { login } from '../../features/actions/auth';

const Login: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onChangeUsername = (e: any) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  return (<></>)

}

export default Login