import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { Features } from './Features';

export function TeamPage() {
  return (
    <>
      <Helmet>
        <title>TeamPage</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container
        maxWidth="lg"
        sx={{
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
