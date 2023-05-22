import { createSlice } from '@reduxjs/toolkit';
import { TeamFormState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { teamFormSaga } from './saga';

export const initialState: TeamFormState = {
  teams: null,
  loading: false,
  selectedTeam: null,
};

const slice = createSlice({
  name: 'teamForm',
  initialState,
  reducers: {
    changeTeamSelected(state, action) {
      state.selectedTeam = action.payload;
    },
    loadTeams(state) {
      state.loading = true;
      state.teams = [];
    },
    teamsLoaded(state, action) {
      state.loading = false;
      state.teams = action.payload;
    },
    loadTeamsError(state) {
      state.loading = false;
    },
  },
});

export const { actions: teamFormActions, reducer } = slice;

export const useTeamFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: teamFormSaga });
  return { actions: slice.actions };
};
