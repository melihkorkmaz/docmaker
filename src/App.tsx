import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components
import ErrorToast from './components/ErrorToast';
import Routes from './Routes';

import { appOperations } from './store/app';

import './assets/globalStyles.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appOperations.initializeApp());
  }, [dispatch]);

  return (
    <>
      <ErrorToast />
      <Routes />
    </>
  );
};

export default App;
