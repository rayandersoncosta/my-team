import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectDomain = (state: RootState) => state?.countryForm || initialState;

export const selectCountries = createSelector(
  [selectDomain],
  countryFormState => countryFormState.countries,
);

export const selectCountrySelected = createSelector(
  [selectDomain],
  countryFormState => countryFormState.selectedCountry,
);
