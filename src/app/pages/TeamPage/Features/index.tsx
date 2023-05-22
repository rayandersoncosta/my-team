import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

import { PlayersTable } from './PlayersTable';
import { Statistics } from './Statistics';

export function Features() {
  return (
    <Grid container sx={{ marginTop: '20px' }} spacing={4}>
      <Grid
        item
        xs={12}
        component={Paper}
        sx={{ padding: '20px 20px 40px 20px' }}
      >
        <Typography variant="h5">Lista de jogadores</Typography>
        <PlayersTable />
      </Grid>
      <Statistics />
    </Grid>
  );
}
