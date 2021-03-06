import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../gateway/fake-gateway';
import { setAuthToken } from '../context';

import { Button, Form, Alert, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';

export const Login = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function postLogin() {
    const authToken = signIn({ userName, password });
    if (authToken != null) {
      setAuthToken(authToken);
      navigate('/lists', { replace: true });
    } else {
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
