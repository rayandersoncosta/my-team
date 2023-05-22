import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.leagueForm || initialState;

export const selectLeagues = createSelector(
  [selectDomain],
  leagueFormState => leagueFormState.leagues,
);

export const selectLeagueSelected = createSelector(
  [selectDomain],
  leagueFormState => leagueFormState.selectedLeague,
);
