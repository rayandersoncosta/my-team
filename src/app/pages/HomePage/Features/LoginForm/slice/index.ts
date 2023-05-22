import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadTimezonesErrorType, LoginFormState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { loginFormSaga } from './saga';

export const initialState: LoginFormState = {
  isAuthenticated: false,
  loading: false,
  token: '',
  error: null,
};

const slice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    authenticationError(state, action: PayloadAction<LoadTimezonesErrorType>) {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      state.token = '';
    },
    authenticationSuccess(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload;
    },
  },
});

export const { actions: loginFormActions, reducer } = slice;

export const useLoginFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginFormSaga });
  return { actions: slice.actions };
};
