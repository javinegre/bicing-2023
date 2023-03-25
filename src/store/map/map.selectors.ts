import { createDraftSafeSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

const mapSelector = (state: RootState) => state.map;
export const mapHandlerSelector = createDraftSafeSelector(
  mapSelector,
  (mapState) => mapState.mapHandler
);
export const mapCenterSelector = createDraftSafeSelector(
  mapSelector,
  (mapState) => mapState.center
);
export const mapZoomSelector = createDraftSafeSelector(mapSelector, (mapState) => mapState.zoom);
export const userLocationSelector = createDraftSafeSelector(
  mapSelector,
  (mapState) => mapState.geoLocation.position
);
export const userLocationStatusSelector = createDraftSafeSelector(
  mapSelector,
  (mapState) => mapState.geoLocation.status
);
