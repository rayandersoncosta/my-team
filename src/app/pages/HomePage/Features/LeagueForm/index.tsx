import React, { useEffect } from 'react';
import { TextField, Autocomplete, Button, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useLeagueFormSlice } from './slice';
import { selectLeagues } from './slice/selectors';

export function LeagueForm() {
  const theme = useTheme();
  const { actions } = useLeagueFormSlice();
  const leagues = useSelector(selectLeagues);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      league: null,
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(actions.changeLeagueSelected(values.league));
    },
  });

  useEffect(() => {
    if (!leagues) {
      dispatch(actions.loadLeagues());
    }
  }, [leagues]); // eslint-disable-line

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={leagues || []}
        onChange={(event, value) => formik.setFieldValue('league', value)}
        autoHighlight
        getOptionLabel={(option: any) => option.league.name}
        renderOption={(props, option: any) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="20" src={option.league.logo} alt="" />
            {option.league.name}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Liga"
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
        disabled={!formik.values.league}
      >
        {!formik.values.league ? 'Escolha uma Liga' : 'Escolher Time'}
      </Button>
    </form>
  );
}
