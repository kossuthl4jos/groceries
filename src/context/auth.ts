import { createContext, useContext } from 'react';
import { getToken, setToken } from '../utils';

export const AuthContext = createContext({
  authToken: getToken(),
  setAuthToken: (token: string) => setToken(token),
});

export function useAuth() {
  return useContext(AuthContext);
}
