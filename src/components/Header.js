import React from 'react'
import { Link  } from 'react-router-dom';
import { useAuth } from "../context/auth";

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';

export default function Header() {
	const { setAuthTokens, authTokens } = useAuth();

	function logOut() {
    setAuthTokens();
	}
	
	return (
		<div>
		<Navbar className="justify-content-between" bg="primary" variant="dark">
				<Navbar.Brand>Groceries</Navbar.Brand>
				<Form inline>
					{
						authTokens ?
						<div
							className="sign-out"
							onClick={ logOut }>
							<i className="fas fa-sign-out-alt sign-out" />
							Sign out
						</div> :
							<Link
								className="sign-in"
								to="/login">
								<i className="fas fa-sign-in-alt" />
									Sign in
							</Link>
					}
				</Form>
			</Navbar>
		</div>
	)
}
