import React, { ReactNode } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from './context';

export const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { authToken, setAuthToken } = useAuth();
  console.log('authTokens: ', authToken);

  if (authToken !== '') {
    return (
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <Routes>
          <Route {...rest}>{children}</Route>;
        </Routes>
      </AuthContext.Provider>
    );
  } else {
    navigate('/login', { replace: true });
    return null;
  }
};
