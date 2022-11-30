import type { Station } from '@hooks/useStation';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setGMapsCenter } from '@store/map';

const selectStation = createAsyncThunk<Station['id'], Station>(
  'map/selectStation',
  async (payload, thunkAPI) => {
    const { lat, lng, id } = payload;

    thunkAPI.dispatch(setGMapsCenter({ lat, lng }));

    return id;
  }
);

export { selectStation };
