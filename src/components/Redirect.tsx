import { useEffect } from 'react';
import { generatePath, useLocation, useMatch } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const Redirect = ({ to, from }: { to: string; from: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch(from);

  useEffect(() => {
    if (match?.path === from) {
      const pathname = generatePath(to, match.params);
      navigate({ pathname, search: location.search }, { replace: true });
    }
  }, [location.pathname]);

  return null;
};
