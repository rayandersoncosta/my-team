import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { leagueFormActions } from '.';
import { loginFormActions } from '../../LoginForm/slice';
import { LoadTimezonesErrorType } from '../../LoginForm/slice/types';
import { selectToken } from '../../LoginForm/slice/selectors';
import { selectCountrySelected } from '../../CountryForm/slice/selectors';
import { selectSeasonSelected } from '../../SeasonForm/slice/selectors';

export function* getLeagues() {
  try {
    const token: string = yield select(selectToken);
    const country: any = yield select(selectCountrySelected);
    const season: number = yield select(selectSeasonSelected);

    const response = yield axios.get(
      'https://v3.football.api-sports.io/leagues',
      {
        params: {
          country: country.name,
          season,
        },
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
      yield put(leagueFormActions.leaguesLoaded(response.data.response));
    }
  } catch (error: any) {
    yield put(
      loginFormActions.authenticationError(
        LoadTimezonesErrorType.INVALID_TOKEN,
      ),
    );
  }
}

export function* leagueFormSaga() {
  yield takeLatest(leagueFormActions.loadLeagues, getLeagues);
}
