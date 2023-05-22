import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { Features } from './Features';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Features />
      </Container>
    </>
  );
}
