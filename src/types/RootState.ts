// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { LoginFormState } from 'app/pages/HomePage/Features/LoginForm/slice/types';
import { CountryFormState } from 'app/pages/HomePage/Features/CountryForm/slice/types';
import { SeasonFormState } from 'app/pages/HomePage/Features/SeasonForm/slice/types';
import { LeagueFormState } from 'app/pages/HomePage/Features/LeagueForm/slice/types';
import { TeamFormState } from 'app/pages/HomePage/Features/TeamForm/slice/types';
import { PlayersTableState } from 'app/pages/TeamPage/Features/PlayersTable/slice/types';
import { StatisticsState } from 'app/pages/TeamPage/Features/Statistics/slice/types';
import { ThemeState } from 'app/components/AppBarComponent/Features/ThemeFeature/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  loginForm?: LoginFormState;
  countryForm?: CountryFormState;
  seasonForm?: SeasonFormState;
  leagueForm?: LeagueFormState;
  teamForm?: TeamFormState;
  playersTable?: PlayersTableState;
  statistics?: StatisticsState;
  theme?: ThemeState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
