import React, { useEffect } from 'react';
import { TextField, Autocomplete, Button, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useCountryFormSlice } from './slice';
import { selectCountries } from './slice/selectors';

export function CountryForm() {
  const theme = useTheme();
  const { actions } = useCountryFormSlice();
  const countries = useSelector(selectCountries);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      country: null,
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(actions.changeCountrySelected(values.country));
    },
  });

  useEffect(() => {
    if (!countries) {
      dispatch(actions.loadCountries());
    }
  }, [countries]); // eslint-disable-line

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={countries || []}
        onChange={(event, value) => formik.setFieldValue('country', value)}
        autoHighlight
        getOptionLabel={(option: any) => option.name}
        renderOption={(props, option: any) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="20" src={option.flag} alt="" />
            {option.name}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="País"
            variant="filled"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
          />
        )}
        sx={{ marginBottom: theme.spacing(2) }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!formik.values.country}
      >
        {!formik.values.country ? 'Escolha um País' : 'Escolher Temporada'}
      </Button>
    </form>
  );
}
