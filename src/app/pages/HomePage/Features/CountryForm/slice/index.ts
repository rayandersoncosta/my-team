import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LoadCountriesErrorType, CountryFormState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { countryFormSaga } from './saga';

export const initialState: CountryFormState = {
  countries: null,
  loading: false,
  selectedCountry: null,
  error: null,
};

const slice = createSlice({
  name: 'countryForm',
  initialState,
  reducers: {
    changeCountrySelected(state, action) {
      state.selectedCountry = action.payload;
    },
    loadCountries(state) {
      state.loading = true;
      state.countries = [];
    },
    countriesLoaded(state, action) {
      state.loading = false;
      state.countries = action.payload;
    },
    loadCountriesError(state, action: PayloadAction<LoadCountriesErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: countryFormActions, reducer } = slice;

export const useCountryFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: countryFormSaga });
  return { actions: slice.actions };
};
