import React, { ReactNode, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from './components';
import { AuthContext, useAuth } from './context';

export const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken == null) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken }}>
      <Routes>
        <Route {...rest}>{children}</Route>;
      </Routes>
      <Navbar />
    </AuthContext.Provider>
  );
};
