import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { appSelectors } from '../store/app';
import { userSelectors } from '../store/user';

interface IProps {
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  path: string;
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) =>   {
  const isAuthenticated = useSelector(userSelectors.isAuthenticated);
  const isAppInitiated = useSelector(appSelectors.isAppInitiated);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAppInitiated) {
          //TODO: Implement loading
          return null;
        }

        return isAuthenticated ? <Component {...props} /> : <Redirect to='/sign-in'  />
      }}
    />
  );
};

export default PrivateRoute;