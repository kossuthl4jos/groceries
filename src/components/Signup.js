import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../gateway/fake-gateway'
import { useAuth } from "../context/auth";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function Signup() {
	const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
	const { setAuthTokens } = useAuth();

	function postSignup() {
		if(password !== passwordAgain) {
			this.setIsError();
			return;
		}

		const authTokens = signUp({ userName, password });

		setAuthTokens({ authTokens });
		setLoggedIn(true);
		// error handling
	}

	if (isLoggedIn) {
    return <Redirect to="/" />;
  }
	
	return (
		<Form className="main-component">
			<Form.Group controlId="formBasicUserName">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="username"
					placeholder="Username"
					onChange={ e => {
						setUserName(e.target.value);
					}}
					value={ userName } />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					onChange={ e => {
						setPassword(e.target.value);
					}}
					value={ password } />
			</Form.Group>

			<Form.Group controlId="formBasicPasswordAgain">
				<Form.Label>Password again</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password again"
					onChange={ e => {
						setPasswordAgain(e.target.value);
					}}
					value={ passwordAgain }/>
			</Form.Group>

			<Button
				variant="primary"
				type="submit"
				onClick={ postSignup }>
				Submit
			</Button>

			<Link to="/login">
				<Form.Text className="text-muted">
					Already have an account?
				</Form.Text>
			</Link>
			{
				isError &&
				<Alert variant="danger">Something went wrong...</Alert>
			}
		</Form>
	)
}

export default Signup
