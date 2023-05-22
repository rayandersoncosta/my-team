import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { countryFormActions } from '.';
import { LoadCountriesErrorType } from './types';
import { loginFormActions } from '../../LoginForm/slice';
import { LoadTimezonesErrorType } from '../../LoginForm/slice/types';
import { selectToken } from '../../LoginForm/slice/selectors';

export function* getCountries() {
  try {
    const token: string = yield select(selectToken);

    const response = yield axios.get(
      'https://v3.football.api-sports.io/countries',
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
      yield put(countryFormActions.countriesLoaded(response.data.response));
    }
  } catch (error: any) {
    yield put(
      countryFormActions.loadCountriesError(
        LoadCountriesErrorType.INVALID_TOKEN,
      ),
    );
    yield put(
      loginFormActions.authenticationError(
        LoadTimezonesErrorType.INVALID_TOKEN,
      ),
    );
  }
}

export function* countryFormSaga() {
  yield takeLatest(countryFormActions.loadCountries, getCountries);
}
