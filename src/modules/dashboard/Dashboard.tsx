import { Button } from 'evergreen-ui';
import { useDispatch, useSelector } from 'react-redux';

import { userOperations, userSelectors } from '../../store/user';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getUser);
  
  const handleLogout = () => {
    dispatch(userOperations.logout());  
  };
  
  if (!user) {
    return null;
  }
  
  return (<div>
    {user.name} - {user.tenant && user.tenant.name}
    <div>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  </div>)
};

export default Dashboard;