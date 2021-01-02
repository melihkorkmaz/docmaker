import { toaster } from 'evergreen-ui';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { appSelectors } from '../store/app';

const ToastMessage = () => {
  const toast = useSelector(appSelectors.getToast);
  useEffect(() => {
    if (toast) {
      toaster[toast.type](
        toast?.message,
        {
          description: toast.description,
          duration: 4
        }  
      )
    }
  }, [toast]);
  
  return null;
};

export default ToastMessage;
