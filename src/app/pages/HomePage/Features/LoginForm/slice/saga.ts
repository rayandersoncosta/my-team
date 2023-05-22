import { takeLatest, put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { loginFormActions } from '.';
import { LoadTimezonesErrorType } from './types';

export function* authenticate({ payload }) {
  try {
    const response: AxiosResponse = yield axios.get(
      'https://v3.football.api-sports.io/timezone',
      {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': payload,
        },
      },
    );

    if (Object.keys(response.data.errors).length > 0) {
      yield put(
        loginFormActions.authenticationError(
          LoadTimezonesErrorType.INVALID_TOKEN,
        ),
      );
    } else {
      yield put(loginFormActions.authenticationSuccess(payload));
    }
  } catch (error: any) {
    yield put(
      loginFormActions.authenticationError(
        LoadTimezonesErrorType.INVALID_TOKEN,
      ),
    );
  }
}

export function* loginFormSaga() {
  yield takeLatest(loginFormActions.authenticate, authenticate);
}
