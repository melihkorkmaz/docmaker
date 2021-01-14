import React from 'react';

import PageTitle from '../../components/PageTitle';

const Dashboard = () => {
  // const [file, setFile] = useState<File | undefined>();
  
  
  // const onFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  //   if (evt.target.files && evt.target.files.length) {
  //     setFile(evt.target.files[0]);
  //   }
  // };
  
  // const onFileUpload = async () => {
  //   if (!file) {
  //     return;
  //   }
    
  //   const formData = new FormData(); 
  //   formData.append(
  //     'templateID', 
  //     file, 
  //     file?.name
  //   ); 
  //   const res = await axios.post("/.netlify/functions/uploadTemplateFile", formData);
  //   console.log('res', res);
  // };
  
  return (<div>
    <PageTitle>
      Dashboard
    </PageTitle>
    
    {/* <div>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </div>
    <div> 
        <input type="file" onChange={onFileChange} /> 
        <button onClick={onFileUpload}> 
          Upload! 
        </button> 
    </div>  */}
  </div>)
};

export default Dashboard;