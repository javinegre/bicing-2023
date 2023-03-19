import { BookmarkType, BookmarksStoreState } from './bookmarks.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import LocalStorage from '@utils/localStorage';
import { MapCoordinates } from 'src/types';

const ls = LocalStorage();

const initialState: BookmarksStoreState = {
  home: ls.getPosition('bookmarkHome'),
  work: ls.getPosition('bookmarkWork'),
  favorite: ls.getPosition('bookmarkFavorite'),
};

const getLsBookmarkKey = (type: BookmarkType) => {
  switch (type) {
    case 'work':
      return 'bookmarkWork';
    case 'favorite':
      return 'bookmarkFavorite';
    case 'home':
    default:
      return 'bookmarkHome';
  }
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    updateBookmark: (
      state,
      action: PayloadAction<{ type: BookmarkType; position: MapCoordinates }>
    ) => {
      state[action.payload.type] = action.payload.position;
      ls.setPosition(getLsBookmarkKey(action.payload.type), action.payload.position);
    },
  },
});

export const { updateBookmark } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
