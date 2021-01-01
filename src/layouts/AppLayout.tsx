import { Pane, useTheme } from 'evergreen-ui';
import { Route, Switch } from 'react-router-dom';

// Components
import Dashboard from '../modules/dashboard/Dashboard';

const AppLayout = () => {
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
        <Route exact={true} path="/app/dashboard" component={Dashboard} />
      </Switch>
    </Pane>
  );
};

export default AppLayout;