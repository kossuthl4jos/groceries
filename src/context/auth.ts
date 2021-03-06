import { createContext, useEffect, useState } from 'react';
import { getToken, setToken, clearToken } from '../utils';

export const AuthContext = createContext({
  authToken: getToken(),
});

export const setAuthToken = (token: string) => setToken(token);
export const clearAuthToken = () => clearToken();

export function useAuth() {
  const [authToken, setAuthToken] = useState(getToken());

  useEffect(() => {
    if (getToken() != null) {
      setAuthToken(getToken());
    }
  }, [getToken()]);

  return { authToken };
}
