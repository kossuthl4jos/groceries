import { createContext, useContext } from 'react';
import { getToken, setToken, clearToken } from '../utils';

export const AuthContext = createContext({
  authToken: getToken(),
  setAuthToken: (token: string) => setToken(token),
  clearAuthToken: (token: string) => clearToken(),
});

export function useAuth() {
  return useContext(AuthContext);
}
