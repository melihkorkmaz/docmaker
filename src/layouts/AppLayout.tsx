import { Button, DashboardIcon, DocumentIcon, DocumentOpenIcon, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

// Components
import TopHeader from '../components/TopHeader';
import Dashboard from '../modules/dashboard/Dashboard';
import CreateDocument from '../modules/documents/CreateDocument';
import CreateTemplate from '../modules/templates/CreateTemplate';
import ViewTemplate from '../modules/templates/ViewTemplate';

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
        <Text fontWeight={600} color={theme.colors.text.default} marginLeft={majorScale(1)}>
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
      backgroundColor={theme.scales.neutral.N2}
      borderRightColor={theme.scales.neutral.N4A}
      borderRightWidth={1}
      borderRightStyle="solid"
      paddingTop={majorScale(6)}
    >
      <NavLink text="Dashboard">
        <DashboardIcon
          color={theme.colors.text.default}
          size={18}
        />
      </NavLink>
      <NavLink text="Documents">
        <DocumentOpenIcon
          color={theme.colors.text.default}
          size={18} 
        />
      </NavLink>
      <NavLink text="Templates">
        <DocumentIcon
          color={theme.colors.text.default}
          size={18}
        />
      </NavLink>
    </Pane>
  );
};

const AppLayout = () => {
  const history = useHistory();
  const hasUserTenant = useSelector(userSelectors.hasUserTenant);
  
  useEffect(() => {
    if (!hasUserTenant) {
      history.push('/create-organization');
    }
  }, [hasUserTenant, history]);
  
  return (
    <Pane
      height="100%"
      display="flex"
    >
      <LeftNav />
      <Pane display="flex" flex="1" flexDirection="column">
        <TopHeader />
        <Pane marginX={majorScale(2)} marginY={majorScale(1)} maxWidth={700}>
          <Switch>
            <Route exact={true} path="/app/dashboard" component={Dashboard} />
            <Route exact={true} path="/app/templates/create" component={CreateTemplate} />
            <Route path="/app/templates/view/:id" component={ViewTemplate} />
            <Route path="/app/documents/create" component={CreateDocument} />
          </Switch>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default AppLayout;