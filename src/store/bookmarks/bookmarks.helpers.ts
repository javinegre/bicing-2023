import type { BookmarkType } from './bookmarks.types';
import capitalize from 'lodash/capitalize';

export const getLocalStorageBookmarkKey = (type: BookmarkType) => {
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

export const getSnackbarMessageForBookmark = (type: BookmarkType) =>
  `${capitalize(type)} location saved`;
