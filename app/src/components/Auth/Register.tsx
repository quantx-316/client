import React, {useEffect, useState} from 'react';

//@ts-ignore
import  { Form, Input, CheckButton } from "react-validation";
// import  isEmail  from "validator";
// import { register } from '../../features/actions/auth';
// import { connect } from "react-redux";


const required = (value: any) => {
  
  if (!value) {
    return (
      <div role="alert">
        This field is required!
      </div>
    );
  }
};


const email = (value: any) => {
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  if (!regexp.test(value)) {
    return (
      <div role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value: any) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value: any) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};


const Register: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [successful, setSuccessful] = useState(false)

  const onChangeUsername = (e: any) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: any) => {
    setPassword(e.target.value)
  }

  return(<></>)
  
  // return(<><Form
  //           onSubmit={this.handleRegister}
  //           ref={(c) => {
  //             this.form = c;
  //           }}
  //         >
  //           {!this.state.successful && (
  //             <div>
  //               <div className="form-group">
  //                 <label htmlFor="username">Username</label>
  //                 <Input
  //                   type="text"
  //                   className="form-control"
  //                   name="username"
  //                   value={this.state.username}
  //                   onChange={this.onChangeUsername}
  //                   validations={[required, vusername]}
  //                 />
  //               </div>

  //               <div className="form-group">
  //                 <label htmlFor="email">Email</label>
  //                 <Input
  //                   type="text"
  //                   className="form-control"
  //                   name="email"
  //                   value={this.state.email}
  //                   onChange={this.onChangeEmail}
  //                   validations={[required, email]}
  //                 />
  //               </div>

  //               <div className="form-group">
  //                 <label htmlFor="password">Password</label>
  //                 <Input
  //                   type="password"
  //                   className="form-control"
  //                   name="password"
  //                   value={this.state.password}
  //                   onChange={this.onChangePassword}
  //                   validations={[required, vpassword]}
  //                 />
  //               </div>

  //               <div className="form-group">
  //                 <button className="btn btn-primary btn-block">Sign Up</button>
  //               </div>
  //             </div>
  //           )}

  //           {message && (
  //             <div className="form-group">
  //               <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
  //                 {message}
  //               </div>
  //             </div>
  //           )}
  //           <CheckButton
  //             style={{ display: "none" }}
  //             ref={(c) => {
  //               this.checkBtn = c;
  //             }}
  //           />
  //         </Form></>)
}

export default Register