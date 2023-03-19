import { MapCoordinates } from 'src/types';

export type BookmarkType = 'home' | 'work' | 'favorite';

export type BookmarksStoreState = Record<BookmarkType, MapCoordinates | null>;
