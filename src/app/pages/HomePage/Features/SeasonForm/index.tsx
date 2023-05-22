import React, { useEffect } from 'react';
import { TextField, Autocomplete, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSeasonFormSlice } from './slice';
import { selectSeasons } from './slice/selectors';

export function SeasonForm() {
  const theme = useTheme();
  const { actions } = useSeasonFormSlice();
  const seasons = useSelector(selectSeasons);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      season: '',
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(actions.changeSeasonSelected(values.season));
    },
  });

  useEffect(() => {
    if (!seasons) {
      dispatch(actions.loadSeasons());
    }
  }, [seasons]); // eslint-disable-line

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={seasons || []}
        onChange={(event, value) => {
          formik.setFieldValue('season', value);
        }}
        getOptionLabel={option => option}
        onBlur={formik.handleBlur}
        value={formik.values.season}
        renderInput={params => (
          <TextField {...params} label="Temporada" variant="filled" />
        )}
        sx={{ marginBottom: theme.spacing(2) }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!formik.values.season}
      >
        {!formik.values.season ? 'Escolha uma Temporada' : 'Escolher Liga'}
      </Button>
    </form>
  );
}
