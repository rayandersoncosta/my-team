import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { statisticsActions } from '.';
import { selectSeasonSelected } from 'app/pages/HomePage/Features/SeasonForm/slice/selectors';
import { selectTeamSelected } from 'app/pages/HomePage/Features/TeamForm/slice/selectors';
import { selectToken } from 'app/pages/HomePage/Features/LoginForm/slice/selectors';
import { selectLeagueSelected } from 'app/pages/HomePage/Features/LeagueForm/slice/selectors';

export function* getStatistics() {
  try {
    const token: string = yield select(selectToken);
    const season: number = yield select(selectSeasonSelected);
    const league: any = yield select(selectLeagueSelected);
    const team: any = yield select(selectTeamSelected);

    const response = yield axios.get(
      'https://v3.football.api-sports.io/teams/statistics',
      {
        params: {
          team: team.team.id,
          season,
          league: league.league.id,
        },
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': token,
        },
      },
    );
    yield put(statisticsActions.statisticsLoaded(response.data.response));
  } catch (error: any) {
    console.log(error);
  }
}

export function* statisticsSaga() {
  yield takeLatest(statisticsActions.loadStatistics, getStatistics);
}
