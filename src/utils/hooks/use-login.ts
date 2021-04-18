import { loginUser } from '../../gateway';
import { setToken } from '../tokens';

interface LoginData {
  userName: string;
  password: string;
}

export const useLogin = (): {
  login: (values: LoginData) => Promise<{ error: any }>;
} => {
  const login = async ({ userName, password }: LoginData) => {
    const { _id, error } = await loginUser({ userName, password });

    if (_id != null) {
      setToken({ userKey: _id, userName });
    }
    return { error };
  };

  return { login };
};
