import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { Header } from '../../src/components';

let mockAuthDetails = { authToken: undefined, userName: undefined };
const mockNavigate = jest.fn();
const mockClearAuthToken = jest.fn();

jest.mock('../../src/context', () => ({
  useAuth: jest.fn().mockImplementation(() => {
    return mockAuthDetails;
  }),
  clearAuthToken: jest.fn().mockImplementation(() => mockClearAuthToken()),
}));

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockNavigate,
  Link: jest.fn().mockImplementation(({ children }) => {
    return children;
  }),
}));

describe('Header', () => {
  test('Header rendered with sign in, when user is not yet authenticated', () => {
    const { getByText } = render(<Header />);

    expect(getByText('Sign in')).toBeTruthy();
    expect(mockClearAuthToken).toHaveBeenCalledTimes(0);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  test('Header rendered with log out, when user is authenticated', () => {
    mockAuthDetails = { authToken: 'authToken', userName: 'userName' };

    const { getByText } = render(<Header />);

    expect(getByText('Groceries - Hello userName!')).toBeTruthy();
    expect(getByText('Log out')).toBeTruthy();
    expect(mockClearAuthToken).toHaveBeenCalledTimes(0);
    expect(mockNavigate).toHaveBeenCalledTimes(0);
  });

  test('logOut delegates, when user is logged in', () => {
    mockAuthDetails = { authToken: 'authToken', userName: 'userName' };

    const { getByText } = render(<Header />);
    fireEvent.click(getByText('Log out'));

    expect(mockClearAuthToken).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
