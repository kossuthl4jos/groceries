import { useState } from 'react';
import { setToken } from '../tokens';

interface SignUpData {
  userName: string;
  password: string;
}

function createUserKey() {
  return `groceries-user-key-${String(Math.random()).substring(2, 11)}`;
}

export const useSignUp = (): {
  signUp: (values: SignUpData) => void;
  error: boolean;
} => {
  const [error, setError] = useState(false);

  const signUp = ({ userName, password }: SignUpData) => {
    const userKey = createUserKey();

    try {
      const data = JSON.stringify({ userName, password });
      localStorage.setItem(userKey, data);

      setToken({ userKey, userName });
    } catch {
      setError(true);
    }
  };

  return { signUp, error };
};
