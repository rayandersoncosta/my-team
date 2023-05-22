import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import { LoginForm } from './LoginForm';
import { RegisterLink } from './RegisterLink';
import { CountryForm } from './CountryForm';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './LoginForm/slice/selectors';
import { selectCountrySelected } from './CountryForm/slice/selectors';
import { selectSeasonSelected } from './SeasonForm/slice/selectors';
import { SeasonForm } from './SeasonForm';
import { selectLeagueSelected } from './LeagueForm/slice/selectors';
import { LeagueForm } from './LeagueForm';
import { TeamForm } from './TeamForm';

const PresentationComponent = () => {
  return (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="https://www.api-football.com/public/img/home1/hero-banner.png"
          alt="banner"
          width={250}
        ></img>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="p" align="center">
          API-Football
        </Typography>
        <Typography variant="caption" component="p" align="center">
          Acompanhe estatísticas atualizadas sobre seu time!
        </Typography>
      </Grid>
    </>
  );
};

export function Features() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const selectedCountry = useSelector(selectCountrySelected);
  const selectedSeason = useSelector(selectSeasonSelected);
  const selectedLeague = useSelector(selectLeagueSelected);

  if (!isAuthenticated) {
    return (
      <Grid container component={Paper} sx={{ padding: '15px' }} spacing={2}>
        <PresentationComponent />
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
        <Grid item xs={6}>
          <RegisterLink />
        </Grid>
      </Grid>
    );
  }

  if (!selectedCountry) {
    return (
      <Grid container component={Paper} sx={{ padding: '15px' }} spacing={2}>
        <PresentationComponent />
        <Grid item xs={12}>
          <CountryForm />
        </Grid>
      </Grid>
    );
  }

  if (!selectedSeason) {
    return (
      <Grid container component={Paper} sx={{ padding: '15px' }} spacing={2}>
        <PresentationComponent />
        <Grid item xs={12}>
          <SeasonForm />
        </Grid>
      </Grid>
    );
  }

  if (!selectedLeague) {
    return (
      <Grid container component={Paper} sx={{ padding: '15px' }} spacing={2}>
        <PresentationComponent />
        <Grid item xs={12}>
          <LeagueForm />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container component={Paper} sx={{ padding: '15px' }} spacing={2}>
      <PresentationComponent />
      <Grid item xs={12}>
        <TeamForm />
      </Grid>
    </Grid>
  );
}
