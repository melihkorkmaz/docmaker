import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components
import ToastMessage from './components/ToastMessage';
import Routes from './Routes';

import { appOperations } from './store/app';

import './assets/globalStyles.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appOperations.initializeApp());
  }, [dispatch]);

  return null;
  
  return (
    <>
      <ToastMessage />
      <Routes />
    </>
  );
};

export default App;
