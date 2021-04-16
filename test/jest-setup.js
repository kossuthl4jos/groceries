jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => ({
      navigate: jest.fn(),
    }),
    Link: jest.fn().mockImplementation(({ children }) => {
      return children;
    }),
  };
});
