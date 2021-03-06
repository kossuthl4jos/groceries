import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context';

export default function Header() {
  const { authToken, clearAuthToken } = useAuth();

  function logOut() {
    if (authToken != null) {
      clearAuthToken(authToken);
    }
  }

  return (
    <div>
      <Navbar className="justify-content-between" bg="primary" variant="dark">
        <Navbar.Brand>Groceries</Navbar.Brand>
        {authToken ? (
          <div className="sign-out" onClick={logOut}>
            <i className="fas fa-sign-out-alt sign-out" />
            Sign out
          </div>
        ) : (
          <Link className="sign-in" to="/login">
            <i className="fas fa-sign-in-alt" />
            Sign in
          </Link>
        )}
      </Navbar>
    </div>
  );
}
