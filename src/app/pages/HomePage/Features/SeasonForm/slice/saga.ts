import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { seasonFormActions } from '.';
import { loginFormActions } from '../../LoginForm/slice';
import { LoadTimezonesErrorType } from '../../LoginForm/slice/types';
import { selectToken } from '../../LoginForm/slice/selectors';

export function* getSeasons() {
  try {
    const token: string = yield select(selectToken);

    const response = yield axios.get(
      'https://v3.football.api-sports.io/leagues/seasons',
      {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': token,
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
      yield put(seasonFormActions.seasonsLoaded(response.data.response));
    }
  } catch (error: any) {
    yield put(
      loginFormActions.authenticationError(
        LoadTimezonesErrorType.INVALID_TOKEN,
      ),
    );
  }
}

export function* seasonFormSaga() {
  yield takeLatest(seasonFormActions.loadSeasons, getSeasons);
}
