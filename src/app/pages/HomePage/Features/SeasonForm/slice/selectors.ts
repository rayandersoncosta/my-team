import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.seasonForm || initialState;

export const selectSeasons = createSelector(
  [selectDomain],
  seasonFormState => seasonFormState.seasons,
);

export const selectSeasonSelected = createSelector(
  [selectDomain],
  seasonFormState => seasonFormState.selectedSeason,
);
