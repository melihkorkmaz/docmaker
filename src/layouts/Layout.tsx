import { Pane, useTheme } from 'evergreen-ui';
import { Route, Switch } from 'react-router-dom';

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
      backgroundColor={theme.scales.neutral.N3}
    >
      <Switch>
        <Route exact={true} path="/sign-in" component={Login} />
        <Route exact={true} path="/sign-up" component={Register} />
        <PrivateRoute exact={true} path="create-organization" component={CreateTenant} />
      </Switch>
    </Pane>
  );
};

export default Layout;