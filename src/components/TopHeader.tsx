import { Avatar, Button, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IState from '../store/IState';
import { userOperations, userSelectors } from '../store/user';

import UserModel from '../models/UserModel';

import Card from './Card';

const TopHeader = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector<IState, UserModel | undefined>(userSelectors.getUser);
  
  const handleLogout = () => {
    dispatch(userOperations.logout());  
  };
  
  return (
    <Pane height={80} paddingTop={majorScale(2)} paddingLeft={majorScale(2)} paddingRight={majorScale(2)}>
      <Card
        height={50}
        display="flex"
        alignItems="center"
        flexDirection="row-reverse"
        backgroundColor={theme.scales.neutral.N2}
      >
        <>
          <Button appearance="minimal" intent="success" marginLeft={majorScale(1)} onClick={handleLogout}>
            Logout
          </Button>
          {user &&
            <>
              <Text paddingLeft={majorScale(1)}>
                - {user.tenant && user.tenant.name}
              </Text>
              <Avatar isSolid={true} color="green" name={user.name} size={35} />
              
            </>
          }
        </>
      </Card>
    </Pane>
  );
};

export default TopHeader;