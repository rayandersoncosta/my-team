import { createSlice } from '@reduxjs/toolkit';
import { StatisticsState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { statisticsSaga } from './saga';

export const initialState: StatisticsState = {
  statistics: null,
  loading: false,
};

const slice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    loadStatistics(state) {
      state.loading = true;
    },
    statisticsLoaded(state, action) {
      state.loading = false;
      state.statistics = action.payload;
    },
  },
});

export const { actions: statisticsActions, reducer } = slice;

export const useStatisticsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: statisticsSaga });
  return { actions: slice.actions };
};
