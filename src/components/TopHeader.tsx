import { Button, majorScale, Pane, Text, useTheme } from 'evergreen-ui';
import { useDispatch, useSelector } from 'react-redux';
import IState from '../store/IState';
import { userOperations, userSelectors } from '../store/user';
import { IUser } from '../utility/interfaces';

import Card from './Card';

const TopHeader = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector<IState, IUser | undefined>(userSelectors.getUser);
  
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
      >
        <>
          <Button appearance="minimal" intent="success" marginLeft={majorScale(1)} onClick={handleLogout}>
            Logout
          </Button>
          {user &&
            <Text>
              {user.name} - {user.tenant && user.tenant.name}
            </Text>
          }
        </>
      </Card>
    </Pane>
  );
};

export default TopHeader;