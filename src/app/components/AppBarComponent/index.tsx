import * as React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

import { ThemeFeature } from './Features/ThemeFeature';

interface Props {}

export function AppBarComponent(props: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body1" color="inherit" component="div">
            API-Football
          </Typography>
          <ThemeFeature />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
