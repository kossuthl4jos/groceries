import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../context';

import { Button, Form, Alert, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';
import { useLogin } from '../utils';

export const Login = () => {
  const navigate = useNavigate();
  const { login, user, error } = useLogin();
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function postLogin() {
    login({ userName, password });
    if (user != null) {
      setAuthToken(user);
      navigate('/lists', { replace: true });
    } else if (error) {
      setIsError(true);
    }
  }

  return (
    <div>
      <Form className="main-component">
        <FormGroup controlId="formUserName">
          <FormLabel>Username</FormLabel>
          <FormControl
            type="username"
            placeholder="Username"
            onChange={(e: ChangeEvent) => {
              setUserName((e.target as HTMLInputElement).value);
            }}
            value={userName}
          />
        </FormGroup>

        <FormGroup controlId="formBasicPassword">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="new-password"
            placeholder="Password"
            onChange={(e: ChangeEvent) => {
              setPassword((e.target as HTMLInputElement).value);
            }}
            value={password}
          />
        </FormGroup>

        <Button variant="primary" type="submit" onClick={postLogin}>
          Sign in
        </Button>

        <Link to="/signup">
          <FormText className="text-muted">Don't have an account yet?</FormText>
        </Link>
        {isError && (
          <Alert variant="danger">The username or password provided were incorrect!</Alert>
        )}
      </Form>
    </div>
  );
};
