import { getLocalStorageBookmarkKey, getSnackbarMessageForBookmark } from './bookmarks.helpers';
import type { BookmarkType } from './bookmarks.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { enqueueSnackbar } from '@store/ui';
import LocalStorage from '@utils/localStorage';
import type { MapCoordinates } from 'src/types';

const ls = LocalStorage();

export const updateBookmark = createAsyncThunk<
  { type: BookmarkType; position: MapCoordinates },
  { type: BookmarkType; position: MapCoordinates }
>('bookmarks/updateBookmark', async (payload, thunkAPI) => {
  ls.setPosition(getLocalStorageBookmarkKey(payload.type), payload.position);
  thunkAPI.dispatch(enqueueSnackbar({ message: getSnackbarMessageForBookmark(payload.type) }));

  return payload;
});

export const clearBookmark = createAsyncThunk<{ type: BookmarkType }, { type: BookmarkType }>(
  'bookmarks/clearBookmark',
  async (payload) => {
    ls.setPosition(getLocalStorageBookmarkKey(payload.type), null);

    return payload;
  }
);
