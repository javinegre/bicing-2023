import { MapHandlerId } from './map.types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

const mapSelector = (state: RootState) => state.map;
export const mapHandlerSelector = (mapHandlerId: MapHandlerId) =>
  createDraftSafeSelector(mapSelector, (mapState) => mapState.mapHandlers?.[mapHandlerId]);
