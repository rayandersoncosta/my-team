import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.teamForm || initialState;

export const selectTeams = createSelector(
  [selectDomain],
  teamFormState => teamFormState.teams,
);

export const selectTeamSelected = createSelector(
  [selectDomain],
  teamFormState => teamFormState.selectedTeam,
);
