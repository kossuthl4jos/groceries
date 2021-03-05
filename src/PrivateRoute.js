import React, { useEffect } from 'react';
import { Route, useNavigate  } from 'react-router-dom';
import { useAuth } from "./context/auth";


function PrivateRoute({ component: Component, ...rest }) {
	const navigate = useNavigate();
	const { authTokens } = useAuth();

  useEffect(() => {
    if (authTokens === '') {
			navigate('/login')
    }
  }, [authTokens]);

  return(
		<Route
		{...rest}
		render={(props) =>
			authTokens ?
			(<Component {...props} />) : null
		}
    />
  );
}

export default PrivateRoute;