import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { Login } from '../../src/components';

let mockLoginDetails = {
  error: undefined,
};
const mockLogin = jest.fn().mockImplementation(() => {
  return Promise.resolve(mockLoginDetails);
});
const mockNavigate = jest.fn();

jest.mock('../../src/utils/hooks', () => ({
  useLogin: jest.fn().mockImplementation(() => ({
    login: mockLogin,
  })),
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

describe('Login', () => {
  test('Login renders with disabled button', async () => {
    const { getByText } = render(<Login />);

    expect(getByText('Sign in')['disabled']).toBe(true);
  });

  test('Login renders with disabled button, when only username is filled', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.input(getByPlaceholderText('Username'), {
      target: {
        value: 'Username',
      },
    });

    expect(getByText('Sign in')['disabled']).toBe(true);
  });

  test('Login enables button, when only username and password are filled', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.input(getByPlaceholderText('Username'), {
      target: {
        value: 'username',
      },
    });
    fireEvent.input(getByPlaceholderText('Password'), {
      target: {
        value: 'password',
      },
    });

    expect(getByText('Sign in')['disabled']).toBe(false);
  });

  test('Login navigates when login is successful', async () => {
    const { getByText, getByPlaceholderText } = render(<Login />);

    fireEvent.input(getByPlaceholderText('Username'), {
      target: {
        value: 'username',
      },
    });
    fireEvent.input(getByPlaceholderText('Password'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.click(getByText('Sign in'));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledTimes(1));
  });

  test('Login shows error message when login fails', async () => {
    mockLoginDetails = { error: true };

    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.input(getByPlaceholderText('Username'), {
      target: {
        value: 'username',
      },
    });
    fireEvent.input(getByPlaceholderText('Password'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.click(getByText('Sign in'));

    await waitFor(() =>
      expect(getByText('The username or password provided were incorrect!')).toBeTruthy(),
    );
  });
});
