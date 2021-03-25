import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { NavbarBrand, Navbar } from 'react-bootstrap';
import { clearAuthToken, useAuth } from '../context';

export function Header() {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();

  function logOut() {
    if (authToken != null) {
      clearAuthToken();
      navigate('/login');
    }
  }

  return (
    <div>
      <Navbar className="justify-content-between" bg="primary" variant="dark">
        <NavbarBrand>Groceries - {authToken != null ? `Hello ${userName}!` : ''}</NavbarBrand>
        {authToken ? (
          <div className="sign-out" onClick={logOut}>
            <i className="fas fa-power-off" />
            Log out
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
