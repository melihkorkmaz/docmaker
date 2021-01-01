import { Pane,  useTheme } from 'evergreen-ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

// Components
import Dashboard from '../modules/dashboard/Dashboard';

import { userSelectors } from '../store/user';

const AppLayout = () => {
  const theme = useTheme();
  const history = useHistory();
  const user = useSelector(userSelectors.getUser);
  
  useEffect(() => {
    if (user && !user.tenant) {
      history.push('/create-organization');
    }
  }, [user, history]);
  
  return (
    <Pane
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={theme.scales.neutral.N3}
    >
      <Switch>
        <Route exact={true} path="/app/dashboard" component={Dashboard} />
      </Switch>
    </Pane>
  );
};

export default AppLayout;