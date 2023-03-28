import React, { FC } from 'react';
import CustomSvgIcon from '@components/Icons/CustomSvgIcon';
import Button from '@mui/material/Button/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { bookmarksSelector, updateBookmark } from '@store/bookmarks';
import { BookmarkType } from '@store/bookmarks/bookmarks.types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { mapCenterSelector, setGMapsCenter } from '@store/map';

const sxCircleButton: SxProps<Theme> = {
  width: '30px',
  height: '30px',
  minWidth: '30px',
  borderRadius: '50%',
  pointerEvents: 'auto',
};

const getBookmarkIcon = (type: BookmarkType) => {
  switch (type) {
    case 'work':
      return 'briefcase';
    case 'favorite':
      return 'star';
    case 'home':
    default:
      return 'home';
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
        <CustomSvgIcon icon={getBookmarkIcon(type)} size="14" />
      </Button>
    </>
  );
};

export default MapBookmark;
