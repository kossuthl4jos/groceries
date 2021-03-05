import { createContext, useContext } from 'react';

export const AuthContext = createContext<{
  authToken: string;
  setAuthToken: () => Promise<void>;
}>({
  authToken: '',
  setAuthToken: () =>
    new Promise((resolve) => {
      resolve();
    }),
});

export function useAuth() {
  return useContext(AuthContext);
}
