import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Base from './Base';
import authService from '../services/authService';
import userService from '../services/userService';
import algoService from '../services/algoService';

export const About: React.FC = () => {
  const history = useHistory()

  const [user, setUser] = useState({});

  const onGetCurrUser = async () => {
    const res = await userService.getCurrentUser();
    //@ts-ignore
    setUser(res && res.data ? res.data : {});
  }

  const onUpdateUser = async () => {
    const newUser = {
      ...user, 
      firstname: "Bob",
    }
    //@ts-ignore
    const res = await userService.updateUser(newUser);
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
        onClick={() => authService.login("random@gmail.com", "test")}
      >
        Test login
      </button>
      <button
        type="button"
        className="btn"
        cy-data="go-back-button"
        onClick={() => authService.register("random@gmail.com", "random", "test")}
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
        onClick={() => userService.getUsers()}
      >
        Test get users
      </button>
    </div>
  )
}
