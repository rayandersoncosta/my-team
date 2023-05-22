import React from 'react';
import { TextField, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLoginFormSlice } from './slice';
import { selectLoading } from './slice/selectors';

export function LoginForm() {
  const theme = useTheme();
  const { actions } = useLoginFormSlice();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: yup.object({
      token: yup.string().required('O token é obrigatório'),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(actions.authenticate(values.token));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="token"
        label="Token de acesso"
        variant="filled"
        color="primary"
        fullWidth
        value={formik.values.token}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={formik.touched.token && formik.errors.token}
        error={Boolean(formik.touched.token && formik.errors.token)}
        disabled={isLoading}
        sx={{ marginBottom: theme.spacing(2) }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? 'Carregando...' : 'Enviar'}
      </Button>
    </form>
  );
}
