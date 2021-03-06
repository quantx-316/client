import React, { Fragment, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import Base from './Base';
import authService from '../services/authService';
import userService from '../services/userService';
import algoService from '../services/algoService';
import {register, login, logout} from '../features/actions/auth';

const Dev: React.FC = () => {
  const history = useHistory()

  // used in conjunction with isLoggedIn to redirect user after login/logout 
  const [requestMade, setRequestMade] = useState(false);

  const dispatch = useDispatch();

  const onGetCurrUser = async () => {
    const res = await userService.getCurrentUser();
    //@ts-ignore
    console.log(res);
  }

  //@ts-ignore
  const user = useSelector(state => state.auth.user);

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && requestMade) {
      history.push("/home");
    } else if (requestMade) {
      history.push("/auth");
    }
  }, [isLoggedIn])

  const onUpdateUser = async () => {
      const newUser = {
      ...user, 
      firstname: "Bob",
    }
    //@ts-ignore
    const res = await userService.updateUser(newUser);
  }

  const onRegister = () => {
    dispatch(register("random", "random@gmail.com", "test"));
  }

  const onLogin = () => {
    dispatch(login("random@gmail.com", "test"));
    setRequestMade(true);
  }

  const onLogout = () => {
    setRequestMade(true);
  }

  return (
    <div>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
        possimus doloribus error cumque autem asperiores, ullam deserunt quidem
        omnis doloremque itaque eius eaque sint facilis unde tenetur reiciendis
        aliquam soluta?
      </p>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => onLogin()}
      >
        Test login
      </button>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => onRegister()}
      >
        Test register
      </button>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => onGetCurrUser()}
      >
        Test get current user  
      </button>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => userService.getUser("random")}
      >
        Test get user  
      </button>

      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => onUpdateUser()}
      >
        Test on update user 
      </button>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => onLogout()}
      >
        Test logout
      </button>
    </div>
  )
}

export default Dev; 
