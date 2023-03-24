import { clearBookmark, updateBookmark } from './bookmarks.thunks';
import type { BookmarksStoreState } from './bookmarks.types';
import { createSlice } from '@reduxjs/toolkit';
import LocalStorage from '@utils/localStorage';

const ls = LocalStorage();

const initialState: BookmarksStoreState = {
  home: ls.getPosition('bookmarkHome'),
  work: ls.getPosition('bookmarkWork'),
  favorite: ls.getPosition('bookmarkFavorite'),
};

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateBookmark.fulfilled, (state, action) => {
      state[action.payload.type] = action.payload.position;
    });
    builder.addCase(clearBookmark.fulfilled, (state, action) => {
      state[action.payload.type] = null;
    });
  },
});

// export const { } = bookmarksSlice.actions;

export default bookmarksSlice.reducer;
