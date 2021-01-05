import { Button, DashboardIcon, DocumentIcon, DocumentOpenIcon, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

// Components
import TopHeader from '../components/TopHeader';
import Dashboard from '../modules/dashboard/Dashboard';
import CreateTemplate from '../modules/templates/CreateTemplate';

import { userSelectors } from '../store/user';

interface INavLinkProps {
  children: JSX.Element;
  text?: string;
}

const NavLink = (props: INavLinkProps) => {
  const theme = useTheme();
  
  return (
    <Button appearance="minimal" paddingY={majorScale(3)}>
      <Pane display="flex" flexDirection="row" alignItems="center">
        <Pane display="flex" alignItems="left" width="40">
          {props.children}
        </Pane>
        <Text fontWeight={500} color={theme.palette.neutral.lightest} marginLeft={majorScale(1)}>
          {props.text}
        </Text>
      </Pane>
    </Button>
  );
};

const LeftNav = () => {
  const theme = useTheme();
  
  return (
    <Pane
      display="flex"
      justifyContent="top"
      alignItems="left"
      flexDirection="column"
      width={170}
      height="100%"
      backgroundColor={theme.palette.green.base}
      paddingTop={majorScale(6)}
    >
      <NavLink text="Dashboard">
        <DashboardIcon
          color={theme.palette.neutral.lightest}
          size={18}
        />
      </NavLink>
      <NavLink text="Documents">
        <DocumentOpenIcon
          color={theme.palette.neutral.lightest}
          size={18} 
        />
      </NavLink>
      <NavLink text="Templates">
        <DocumentIcon
          color={theme.palette.neutral.lightest}
          size={18}
        />
      </NavLink>
    </Pane>
  );
};

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
      backgroundColor={theme.scales.neutral.N3}
    >
      <LeftNav />
      <Pane display="flex" flex="1" flexDirection="column">
        <TopHeader />
        <Pane marginX={majorScale(2)} marginY={majorScale(1)}>
          <Switch>
            <Route exact={true} path="/app/dashboard" component={Dashboard} />
            <Route exact={true} path="/app/templates/create" component={CreateTemplate} />
          </Switch>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default AppLayout;