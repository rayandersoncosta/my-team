import { createSlice } from '@reduxjs/toolkit';
import { PlayersTableState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { playersTableSaga } from './saga';

export const initialState: PlayersTableState = {
  players: null,
  loading: false,
};

const slice = createSlice({
  name: 'playersTable',
  initialState,
  reducers: {
    loadPlayers(state) {
      state.loading = true;
    },
    playersLoaded(state, action) {
      state.loading = false;
      state.players = action.payload;
    },
  },
});

export const { actions: playersTableActions, reducer } = slice;

export const usePlayersTableSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: playersTableSaga });
  return { actions: slice.actions };
};
