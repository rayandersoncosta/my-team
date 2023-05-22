import { createSlice } from '@reduxjs/toolkit';
import { LeagueFormState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { leagueFormSaga } from './saga';

export const initialState: LeagueFormState = {
  leagues: null,
  loading: false,
  selectedLeague: null,
};

const slice = createSlice({
  name: 'leagueForm',
  initialState,
  reducers: {
    changeLeagueSelected(state, action) {
      state.selectedLeague = action.payload;
    },
    loadLeagues(state) {
      state.loading = true;
      state.leagues = [];
    },
    leaguesLoaded(state, action) {
      state.loading = false;
      state.leagues = action.payload;
    },
    loadLeaguesError(state) {
      state.loading = false;
    },
  },
});

export const { actions: leagueFormActions, reducer } = slice;

export const useLeagueFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: leagueFormSaga });
  return { actions: slice.actions };
};
