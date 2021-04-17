import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { Signup } from '../../src/components';

const mockSignupDetails = { userKey: 'useKey', userName: 'userName' };
const mockSignUp = jest.fn().mockImplementation(() => mockSignupDetails);
const mockSetToken = jest.fn();
const mockNavigate = jest.fn();

jest.mock('../../src/utils/tokens', () => ({
  setToken: jest.fn().mockImplementation(() => mockSetToken()),
  getToken: jest.fn(),
  clearToken: jest.fn(),
}));

jest.mock('../../src/gateway/fake-gateway', () => ({
  signUp: jest.fn().mockImplementation(() => mockSignUp()),
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

describe('Signup', () => {
  test('Signup renders with disabled button', () => {
    const { getByText } = render(<Signup />);

    expect(getByText('Submit')['disabled']).toBe(true);
  });

  test('Signup renders with disabled button, when only username is filled', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);
    fireEvent.input(getByPlaceholderText('Username'), {
      target: {
        value: 'username',
      },
    });

    expect(getByText('Submit')['disabled']).toBe(true);
  });

  test('Signup renders with disabled button, when password is not repeated', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

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

    expect(getByText('Submit')['disabled']).toBe(true);
  });

  test('Signup enables button, when everything is filled', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

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
    fireEvent.input(getByPlaceholderText('Password again'), {
      target: {
        value: 'password',
      },
    });

    expect(getByText('Submit')['disabled']).toBe(false);
  });

  test('Signup shows error, when not matching passwords are submitted', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

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
    fireEvent.input(getByPlaceholderText('Password again'), {
      target: {
        value: 'other_password',
      },
    });
    fireEvent.click(getByText('Submit'));

    expect(getByText('Something went wrong...')).toBeTruthy();
  });

  test('Signup delegates, when successfully signed up', () => {
    const { getByText, getByPlaceholderText } = render(<Signup />);

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
    fireEvent.input(getByPlaceholderText('Password again'), {
      target: {
        value: 'password',
      },
    });
    fireEvent.click(getByText('Submit'));

    expect(mockSignUp).toHaveBeenCalledTimes(1);
    expect(mockSetToken).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});