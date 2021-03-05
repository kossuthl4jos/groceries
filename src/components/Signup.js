import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../gateway/fake-gateway'
import { useAuth } from "../context/auth";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


function Signup() {
	const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
	const { setAuthTokens } = useAuth();

	function postSignup() {
		if(password !== passwordAgain) {
			setIsError();
			return;
		}

		const authTokens = signUp({ userName, password });
		setAuthTokens({ authTokens });
		navigate('/');
		// TODO error handling
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
					placeholder="Password"
					onChange={ e => {
						setPassword(e.target.value);
					}}
					value={ password } />
					<Form.Text className="text-muted">
						Choose one that you don't mind exposing to the world
					</Form.Text>
			</Form.Group>

			<Form.Group controlId="formBasicPasswordAgain">
				<Form.Label>Password again</Form.Label>
				<Form.Control
					placeholder="Password again"
					onChange={ e => {
						setPasswordAgain(e.target.value);
					}}
					value={ passwordAgain }/>
				<Form.Text className="text-muted">
					Choose one that you don't mind exposing to the world
				</Form.Text>
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
