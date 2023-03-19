import React, { FC } from 'react';
import Button from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { bookmarksSelector, updateBookmark } from '@store/bookmarks';
import { BookmarkType } from '@store/bookmarks/bookmarks.types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapCenterSelector, setGMapsCenter } from '@store/map';

const sxCircleButton: SxProps<Theme> = {
  width: '32px',
  height: '32px',
  minWidth: '32px',
  borderRadius: '50%',
  pointerEvents: 'auto',
};

const getBookmarkLabel = (type: BookmarkType) => {
  switch (type) {
    case 'work':
      return 'W';
    case 'favorite':
      return 'F';
    case 'home':
    default:
      return 'H';
  }
};

const MapBookmark: FC<{ type: BookmarkType }> = (props) => {
  const { type } = props;

  const mapCenter = useAppSelector(mapCenterSelector);
  const bookmarks = useAppSelector(bookmarksSelector);

  const dispatch = useAppDispatch();

  const currentValue = bookmarks[type];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        sx={{
          ...sxCircleButton,
          mb: 1,
          opacity: currentValue !== null ? 1 : 0.5,
        }}
        onClick={() => {
          currentValue === null
            ? dispatch(updateBookmark({ type, position: mapCenter }))
            : dispatch(setGMapsCenter({ center: currentValue, yOffset: 0 }));
        }}
      >
        {getBookmarkLabel(type)}
      </Button>
    </>
  );
};

export default MapBookmark;
