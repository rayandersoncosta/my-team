import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.playersTable || initialState;

export const selectPlayers = createSelector(
  [selectDomain],
  playerTableState => playerTableState.players,
);
