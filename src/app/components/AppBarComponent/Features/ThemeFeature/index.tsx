/**
 *
 * ThemeFeature
 *
 */
import * as React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { selectTheme } from './slice/selectors';
import { useThemeSlice } from './slice';
import { saveTheme } from './utils';

export function ThemeFeature() {
  const { theme } = useSelector(selectTheme);
  const { actions } = useThemeSlice();
  const dispatch = useDispatch();

  const handleChangeTheme = () => {
    saveTheme(theme === 'dark' ? 'light' : 'dark');
    dispatch(actions.changeTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <IconButton onClick={handleChangeTheme}>
      {(theme === 'dark' && <DarkMode />) || <LightMode />}
    </IconButton>
  );
}
