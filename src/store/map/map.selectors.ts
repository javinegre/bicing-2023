import type { RootState } from '../store';
import { MapHandlerId } from './map.types';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const mapSelector = (state: RootState) => state.map;
export const mapHandlerSelector = (mapHandlerId: MapHandlerId) =>
  createDraftSafeSelector(mapSelector, (mapState) => mapState.mapHandlers?.[mapHandlerId]);
