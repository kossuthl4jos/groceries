import React, { ReactNode, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Header, Navbar } from './components';
import { AuthContext, useAuth } from './context';

export const PrivateRoute = ({ children, ...rest }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { authToken, userName } = useAuth();

  useEffect(() => {
    if (authToken == null) {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, userName }}>
      <Header />
      <Routes>
        <Route {...rest}>{children}</Route>;
      </Routes>
      <Navbar />
    </AuthContext.Provider>
  );
};
