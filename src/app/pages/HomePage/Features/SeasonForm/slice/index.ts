import { createSlice } from '@reduxjs/toolkit';
import { SeasonFormState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { seasonFormSaga } from './saga';

export const initialState: SeasonFormState = {
  seasons: null,
  loading: false,
  selectedSeason: null,
};

const slice = createSlice({
  name: 'seasonForm',
  initialState,
  reducers: {
    changeSeasonSelected(state, action) {
      state.selectedSeason = action.payload;
    },
    loadSeasons(state) {
      state.loading = true;
      state.seasons = [];
    },
    seasonsLoaded(state, action) {
      state.loading = false;
      state.seasons = action.payload;
    },
    loadSeasonsError(state) {
      state.loading = false;
    },
  },
});

export const { actions: seasonFormActions, reducer } = slice;

export const useSeasonFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: seasonFormSaga });
  return { actions: slice.actions };
};
