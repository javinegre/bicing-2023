import React from 'react';
import Alert from '@mui/material/Alert/Alert';
import Dialog from '@mui/material/Dialog/Dialog';
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
            <Typography variant="h6">AppError</Typography>
            <Typography>{appError.errorMessage}</Typography>
          </Alert>
        </Dialog>
      ) : null}
    </>
  );
};

export default AppErrorMessage;
