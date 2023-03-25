import React from 'react';
import Alert from '@mui/material/Alert/Alert';
import Dialog from '@mui/material/Dialog/Dialog';
import Divider from '@mui/material/Divider/Divider';
import Typography from '@mui/material/Typography/Typography';
import { useAppSelector } from '@store/hooks';
import { appErrorSelector } from '@store/ui';

const AppErrorMessage = () => {
  const appError = useAppSelector(appErrorSelector);

  return (
    <>
      {appError !== null ? (
        <Dialog open={true}>
          <Alert severity="error">
            <Typography>App Error</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ overflowWrap: 'break-word' }}>{appError.errorMessage}</Typography>
          </Alert>
        </Dialog>
      ) : null}
    </>
  );
};

export default AppErrorMessage;
