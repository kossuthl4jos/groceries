import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { signIn } from '../gateway/fake-gateway'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { useAuth } from "../context/auth";

export const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

	function postLogin() {
		try {
			const authTokens = signIn({ userName, password });
			setAuthTokens({ authTokens });
			setLoggedIn(true);
		}
		catch {
			setIsError(true);
		}
	}

	if (isLoggedIn) {
    return <Redirect to="/" />;
  }

	return (
		<div>
			<Form className="main-component">
				<Form.Group controlId="formUserName">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="username"
						placeholder="Username"
						onChange={ e => {
							setUserName(e.target.value);
						}}
						value={ userName }/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={e => {
							setPassword(e.target.value);
						}}
						value={ password }/>
				</Form.Group>

				<Button
					variant="primary"
					type="submit"
					onClick={ postLogin }>
					Sign in
				</Button>

				<Link to="/signup">
					<Form.Text className="text-muted">
						Don't have an account yet?
					</Form.Text>
				</Link>
				{
					isError &&
					<Alert variant="danger">The username or password provided were incorrect!</Alert>
				}
			</Form>
		</div>
	)
}
