import { Button } from 'evergreen-ui';
import { useDispatch } from 'react-redux';

import { userOperations } from '../../store/user';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(userOperations.logout());  
  };
  
  return (<div>
    Dashboard
    <div>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
  </div>)
};

export default Dashboard;