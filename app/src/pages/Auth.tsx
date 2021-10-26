import React, { useEffect, useState } from 'react'
import {
  Tab,
  Tabs,
  InputGroup,
  Icon,
  Button,
  FormGroup,
} from '@blueprintjs/core'

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
  }

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
            leftIcon="lock"
            onChange={onChangePassword}
            value={password}
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
  }

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
            leftIcon="lock"
            onChange={onChangePassword}
            value={password}
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
