import { Pane, useTheme } from 'evergreen-ui';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// Components
import PrivateRoute from '../components/PrivateRoute';
import Login from '../modules/authentication/Login';
import Register from '../modules/authentication/Register';
import CreateTenant from '../modules/tenants/CreateTenant';

const Layout = (): JSX.Element => {
  const theme = useTheme();
  
  return (
    <Pane
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={theme.palette.neutral.lightest}
    >
      <Switch>
        <Route exact={true} path="/sign-in" component={Login} />
        <Route exact={true} path="/sign-up" component={Register} />
        <PrivateRoute exact={true} path="/create-organization" component={CreateTenant} />
        <Redirect to="/app/dashboard" />
      </Switch>
    </Pane>
  );
};

export default Layout;