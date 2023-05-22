import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.statistics || initialState;

export const selectStatistics = createSelector(
  [selectDomain],
  statisticState => statisticState.statistics,
);
