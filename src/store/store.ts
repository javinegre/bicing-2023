import { apiSlice } from './api/api.slice';
import BookmarksReducer from './bookmarks/bookmarks.slice';
import MapStoreReducer from './map/map.slice';
import UiStoreReducer from './ui/ui.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    bookmarks: BookmarksReducer,
    map: MapStoreReducer,
    ui: UiStoreReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['map/initializeMap/fulfilled'],
        ignoredPaths: ['map.mapHandler'],
      },
    }).concat(apiSlice.middleware),
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
