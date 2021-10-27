import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {
  Tab,
  Tabs,
  InputGroup,
  Icon,
  Button,
  FormGroup,
} from '@blueprintjs/core'
import {register, login, logout} from '../features/actions/auth';
import {dispatchErrorMsg, dispatchSuccessMsg} from '../features/utils/notifs';
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";

const Auth: React.FC = () => {

  return (
    <div>
      <Tabs id="Auth" renderActiveTabPanelOnly={false} large={true}>
        <Tab id="ng" title="Registration" panel={<RegisterPanel />} />
        <Tab id="rx" title="Login" panel={<LoginPanel />} />
      </Tabs>
    </div>
  )
}

const RegisterPanel: React.FC = () => {

  const dispatch = useDispatch();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }
  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    console.log(password)
  }
  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    console.log(email)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (username && password && email) {
      dispatch(register(username, email, password));
      return;
    } 

    dispatchErrorMsg(dispatch, "Not all fields filled out");
  }

  const [showPassword, setShowPassword] = useState(false);

  const onLockClick = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const lockButton = (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`} placement={"left"}>
        <Button
            icon={showPassword ? "unlock" : "lock"}
            // intent={Intent.WARNING}
            // minimal={true}
            onClick={() => onLockClick()}
        />
    </Tooltip2>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup
          disabled={true}
          inline={false}
          labelFor="text-input"
          label={true && 'Username'}
          labelInfo={true && '(required)'}
        >
          <InputGroup
            fill={true}
            large={true}
            placeholder="Enter your username"
            leftIcon="user"
            onChange={onChangeUsername}
            value={username}
          />
        </FormGroup>

        <FormGroup
          disabled={true}
          inline={false}
          labelFor="text-input"
          label={true && 'Email'}
          labelInfo={true && '(required)'}
        >
          <InputGroup
            large={true}
            placeholder="Enter your email"
            leftIcon="envelope"
            onChange={onChangeEmail}
            value={email}
          />
        </FormGroup>

        <FormGroup
          disabled={true}
          inline={false}
          labelFor="text-input"
          label={true && 'Password'}
          labelInfo={true && '(required)'}
        >
          <InputGroup
            large={true}
            placeholder="Enter your password..."
            leftElement={lockButton}
            onChange={onChangePassword}
            value={password}
            type={showPassword ? "text" : "password"}
          />
        </FormGroup>

        <Button
          rightIcon="tick-circle"
          intent="success"
          text="Register"
          type="submit"
          large={true}
          outlined={false}
        />
      </form>
    </div>
  )
}

const LoginPanel: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const history = useHistory();

  //@ts-ignore 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // used in conjunction with isLoggedIn to redirect user after login/logout 
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (isLoggedIn && requestMade) {
      history.push("/home");
    } else if (requestMade) {
      setRequestMade(false);
    }
  }, [isLoggedIn])

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    console.log(password)
  }
  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    console.log(email)
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (email && password) {
      dispatch(login(email, password));
      setRequestMade(true);
      return;
    }

    dispatchErrorMsg(dispatch, "Not all fields filled out");
  }

  const [showPassword, setShowPassword] = useState(false);

  const onLockClick = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const lockButton = (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`} placement={"left"}>
        <Button
            icon={showPassword ? "unlock" : "lock"}
            // intent={Intent.WARNING}
            // minimal={true}
            onClick={() => onLockClick()}
        />
    </Tooltip2>
);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormGroup
          disabled={true}
          inline={false}
          labelFor="text-input"
          label={true && 'Email'}
          labelInfo={true && '(required)'}
        >
          <InputGroup
            large={true}
            placeholder="Enter your email"
            leftIcon="envelope"
            onChange={onChangeEmail}
            value={email}
          />
        </FormGroup>

        <FormGroup
          disabled={true}
          inline={false}
          labelFor="text-input"
          label={true && 'Password'}
          labelInfo={true && '(required)'}
        >
          <InputGroup
            large={true}
            placeholder="Enter your password..."
            leftElement={lockButton}
            onChange={onChangePassword}
            value={password}
            type={showPassword ? "text" : "password"}

          />
        </FormGroup>

        <Button
          rightIcon="tick-circle"
          intent="success"
          text="Login"
          type="submit"
          large={true}
          outlined={false}
        />
      </form>
    </>
  )
}

export default Auth
