import { getToken, setToken } from '../tokens';

interface LoginData {
  userName: string;
  password: string;
}

export const useLogin = (): {
  login: (values: LoginData) => { userKey?: string; error: boolean };
} => {
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
      return { userKey: undefined, error: true };
    } else {
      return { userKey: getToken()!.userKey, error: false };
    }
  };

  return { login };
};
