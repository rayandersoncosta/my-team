import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { playersTableActions } from '.';
import { selectSeasonSelected } from 'app/pages/HomePage/Features/SeasonForm/slice/selectors';
import { selectTeamSelected } from 'app/pages/HomePage/Features/TeamForm/slice/selectors';
import { selectToken } from 'app/pages/HomePage/Features/LoginForm/slice/selectors';

export function* getPlayers() {
  try {
    const token: string = yield select(selectToken);
    const season: number = yield select(selectSeasonSelected);
    const team: any = yield select(selectTeamSelected);

    const response = yield axios.get(
      'https://v3.football.api-sports.io/players',
      {
        params: {
          team: team.team.id,
          season,
        },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': token,
        },
      },
    );
    yield put(playersTableActions.playersLoaded(response.data.response));
  } catch (error: any) {
    console.log(error);
  }
}

export function* playersTableSaga() {
  yield takeLatest(playersTableActions.loadPlayers, getPlayers);
}
