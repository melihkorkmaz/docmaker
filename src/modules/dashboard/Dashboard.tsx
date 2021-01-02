import axios from 'axios';
import { Button } from 'evergreen-ui';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userOperations, userSelectors } from '../../store/user';


const Dashboard = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | undefined>();
  const user = useSelector(userSelectors.getUser);
  
  
  const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length) {
      setFile(evt.target.files[0]);
    }
  };
  
  const onFileUpload = async () => {
    if (!file) {
      return;
    }
    
    const formData = new FormData(); 
    formData.append( 
      'myFile', 
      file, 
      file?.name
    ); 
    const res = await axios.post("/.netlify/functions/helloWorld", formData);
    console.log('res', res);
  };
  
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
    <div> 
        <input type="file" onChange={onFileChange} /> 
        <button onClick={onFileUpload}> 
          Upload! 
        </button> 
    </div> 
  </div>)
};

export default Dashboard;