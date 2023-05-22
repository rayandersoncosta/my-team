export interface CountryFormState {
  countries: any;
  selectedCountry: any;
  loading: any;
  error?: LoadCountriesErrorType | null;
}

export const enum LoadCountriesErrorType {
  INVALID_TOKEN = 1,
}
