import React, { useEffect } from 'react';
import { TextField, Autocomplete, Button, Box, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTeamFormSlice } from './slice';
import { selectTeams } from './slice/selectors';

export function TeamForm() {
  const theme = useTheme();
  let navigate = useNavigate();
  const { actions } = useTeamFormSlice();
  const teams = useSelector(selectTeams);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      team: '',
    },
    onSubmit: async (values, { resetForm }) => {
      dispatch(actions.changeTeamSelected(values.team));
      navigate('/team');
    },
  });

  useEffect(() => {
    if (!teams) {
      dispatch(actions.loadTeams());
    }
  }, [teams]); // eslint-disable-line

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        options={teams || []}
        onChange={(event, value) => formik.setFieldValue('team', value)}
        autoHighlight
        getOptionLabel={(option: any) => option.team.name}
        renderOption={(props, option: any) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="20" src={option.team.logo} alt="" />
            {option.team.name}
          </Box>
        )}
        renderInput={params => (
          <TextField
            {...params}
            label="Time"
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
        disabled={!formik.values.team}
      >
        {!formik.values.team ? 'Escolha um Time' : 'Entrar'}
      </Button>
    </form>
  );
}
