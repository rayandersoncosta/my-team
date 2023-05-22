import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.loginForm || initialState;

export const selectToken = createSelector(
  [selectDomain],
  loginFormState => loginFormState.token,
);

export const selectIsAuthenticated = createSelector(
  [selectDomain],
  loginFormState => loginFormState.isAuthenticated,
);

export const selectLoading = createSelector(
  [selectDomain],
  loginFormState => loginFormState.loading,
);
