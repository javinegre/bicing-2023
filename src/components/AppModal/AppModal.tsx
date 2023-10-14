import React from 'react';
import githubIconImgUrl from '@assets/icons/misc/github.svg?url';
import javiNegreCodesImgUrl from '@assets/images/javi-negre-codes.svg?url';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import config from '@config';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar/AppBar';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogContent from '@mui/material/DialogContent/DialogContent';
import Divider from '@mui/material/Divider/Divider';
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import { type BookmarkType, bookmarksSelector, clearBookmark } from '@store/bookmarks';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { closeModal, modalShownSelector } from '@store/ui';

const AppModal = () => {
  const modalShown = useAppSelector(modalShownSelector);
  const bookmarks = useAppSelector(bookmarksSelector);
  const dispatch = useAppDispatch();

  const _clearBookmark = (type: BookmarkType) => () => {
    dispatch(clearBookmark({ type }));
  };

  const _handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog open={modalShown} fullScreen>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <img src="public/logo192.png" width="42px" height="42px" alt="App Icon" />
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Bicing App (v{config.version})
          </Typography>
          <IconButton edge="start" color="inherit" onClick={_handleClose} aria-label="close">
            <CustomSvgIcon icon="close" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Typography variant="h5">Settings</Typography>
        <List>
          <ListItem
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              opacity: bookmarks.home ? 1 : 0.3,
              pointerEvents: bookmarks.home ? 'auto' : 'none',
            }}
          >
            <Box display="flex" alignItems="center">
              <CustomSvgIcon icon="home" size="16" sx={{ mr: 1 }} />
              <Typography>Home location bookmark</Typography>
            </Box>
            <Button onClick={_clearBookmark('home')}>Clear</Button>
          </ListItem>
          <ListItem
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              opacity: bookmarks.work ? 1 : 0.3,
              pointerEvents: bookmarks.work ? 'auto' : 'none',
            }}
          >
            <Box display="flex" alignItems="center">
              <CustomSvgIcon icon="briefcase" size="16" sx={{ mr: 1 }} />
              <Typography>Work location bookmark</Typography>
            </Box>
            <Button onClick={_clearBookmark('work')}>Clear</Button>
          </ListItem>
          <ListItem
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              opacity: bookmarks.favorite ? 1 : 0.3,
              pointerEvents: bookmarks.favorite ? 'auto' : 'none',
            }}
          >
            <Box display="flex" alignItems="center">
              <CustomSvgIcon icon="star" size="16" sx={{ mr: 1 }} />
              <Typography>Favorite location bookmark</Typography>
            </Box>
            <Button onClick={_clearBookmark('favorite')}>Clear</Button>
          </ListItem>
        </List>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h5" sx={{ mb: 1 }}>
          Info
        </Typography>
        <Typography sx={{ mb: 1 }}>This project was made with ❤ by:</Typography>
        <Box
          component="img"
          src={javiNegreCodesImgUrl}
          alt="javi.negre.co/des"
          sx={{ width: '100%', maxWidth: '320px', mb: 1 }}
        />
        <Link
          href="https://github.com/javinegre/bicing-2023"
          target="_blank"
          rel="noreferrer"
          display="flex"
          sx={{ alignItems: 'center' }}
        >
          <Box
            component="img"
            src={githubIconImgUrl}
            alt="github icon"
            width={20}
            height={20}
            mr={1}
          />
          <Typography>Source code</Typography>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default AppModal;
