import { toaster } from 'evergreen-ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { appSelectors } from '../store/app';

const ErrorToast = () => {
  const error = useSelector(appSelectors.getError);
  useEffect(() => {
    if (error) {
      toaster.danger(
        error?.message,
        {
          description: error.description,
          duration: 4
        }  
      )
    }
  }, [error]);
  
  return null;
};

export default ErrorToast;
