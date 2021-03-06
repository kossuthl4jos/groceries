import { useState } from 'react';

interface LoginData {
  userName: string;
  password: string;
}

export const useLogin = (): {
  login: (values: LoginData) => void;
  user?: string;
  error: boolean;
} => {
  const [user, setUser] = useState<string>();
  const [error, setError] = useState(false);

  const login = (values: LoginData) => {
    for (var key in localStorage) {
      if (key.startsWith('groceries-user-key')) {
        const credentials = JSON.parse(localStorage.getItem(key)!);
        if (credentials.userName === values.userName && credentials.password === values.password) {
          setUser(credentials.userKey);
        }
      }
    }
    if (user == null) {
      setError(true);
    }
  };

  return { login, user, error };
};
