import React, { ReactNode, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from './context';

export const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { authToken, setAuthToken, clearAuthToken } = useAuth();

  useEffect(() => {
    if (authToken === null) {
      navigate('/login', { replace: true });
    }
  }, []);

  //TODO check the context setters seem unnecesarys
  if (authToken !== null) {
    return (
      <AuthContext.Provider value={{ authToken, setAuthToken, clearAuthToken }}>
        <Routes>
          <Route {...rest}>{children}</Route>;
        </Routes>
      </AuthContext.Provider>
    );
  } else {
    return null;
  }
};
