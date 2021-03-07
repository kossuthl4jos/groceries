import { useState } from 'react';
import { getToken, setToken } from '../tokens';

interface LoginData {
  userName: string;
  password: string;
}

export const useLogin = (): {
  login: (values: LoginData) => void;
  error: boolean;
} => {
  const [error, setError] = useState(false);

  const login = (values: LoginData) => {
    for (var key in localStorage) {
      if (key.startsWith('groceries-user-key')) {
        const credentials = JSON.parse(localStorage.getItem(key)!);
        if (credentials.userName === values.userName && credentials.password === values.password) {
          setToken({ userKey: credentials.userKey, userName: credentials.userName });
        }
      }
    }
    if (getToken()?.userKey == null) {
      setError(true);
    }
  };

  return { login, error };
};
