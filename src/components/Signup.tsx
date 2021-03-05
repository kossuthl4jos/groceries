import React, { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../gateway/fake-gateway';

import { Button, Form, Alert, FormGroup, FormLabel, FormControl, FormText } from 'react-bootstrap';

import { useAuth } from '../context';

export const Signup = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const { setAuthToken } = useAuth();

  function postSignup() {
    if (password !== passwordAgain) {
      setIsError(true);
      return;
    }

    const authToken = signUp({ userName, password });
    setAuthToken(authToken);
    navigate('/');
    // TODO error handling
  }

  return (
    <Form className="main-component">
      <FormGroup controlId="formBasicUserName">
        <FormLabel>Name</FormLabel>
        <FormControl
          type="username"
          placeholder="Username"
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setUserName((e.target as HTMLInputElement).value);
          }}
          value={userName}
        />
      </FormGroup>

      <FormGroup controlId="formBasicPassword">
        <FormLabel>Password</FormLabel>
        <FormControl
          placeholder="Password"
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          value={password}
        />
        <FormText className="text-muted">
          Choose one that you don't mind exposing to the world
        </FormText>
      </FormGroup>

      <FormGroup controlId="formBasicPasswordAgain">
        <FormLabel>Password again</FormLabel>
        <FormControl
          placeholder="Password again"
          onChange={(e: FormEvent<HTMLInputElement>) => {
            setPasswordAgain((e.target as HTMLInputElement).value);
          }}
          value={passwordAgain}
        />
        <Form.Text className="text-muted">
          Choose one that you don't mind exposing to the world
        </Form.Text>
      </FormGroup>

      <Button variant="primary" type="submit" onClick={postSignup}>
        Submit
      </Button>

      <Link to="/login">
        <FormText className="text-muted">Already have an account?</FormText>
      </Link>
      {isError && <Alert variant="danger">Something went wrong...</Alert>}
    </Form>
  );
};
