import { createAsyncThunk } from '@reduxjs/toolkit';
import { setGMapsCenter } from '@store/map';
import { RootState } from '@store/store';
import { SelectedStation } from 'src/types';

const selectStation = createAsyncThunk<SelectedStation, SelectedStation>(
  'map/selectStation',
  async (payload, thunkAPI) => {
    const { lat, lng } = payload;

    thunkAPI.dispatch(setGMapsCenter({ center: { lat, lng }, yOffset: 1 }));

    return payload;
  }
);

const unselectStation = createAsyncThunk<void, void>('map/unselectStation', async (_, thunkAPI) => {
  const { center } = (thunkAPI.getState() as RootState).map;
  const { lat, lng } = center;

  thunkAPI.dispatch(setGMapsCenter({ center: { lat, lng }, yOffset: -1 }));
});

export { selectStation, unselectStation };
