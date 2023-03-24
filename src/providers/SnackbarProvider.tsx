import React, { FC, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert/Alert';
import Slide from '@mui/material/Slide/Slide';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { activeSnackbarSelector, processSnackbarQueue } from '@store/ui';

const SnackbarProvider: FC = () => {
  const defaultDuration = 2000;

  const activeSnackbar = useAppSelector(activeSnackbarSelector);
  const dispatch = useAppDispatch();

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (activeSnackbar) {
        dispatch(processSnackbarQueue());
      }
    }, activeSnackbar?.duration ?? defaultDuration);
  }, [activeSnackbar?.id]);

  return (
    <Snackbar
      open={activeSnackbar !== undefined}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert severity="success">{activeSnackbar?.message ?? ''}</Alert>
    </Snackbar>
  );
};

export default SnackbarProvider;
