import { orange } from '@mui/material/colors';
import { createTheme, PaletteOptions } from '@mui/material/styles';

export const theme = (mode: string) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: orange['500'],
        contrastText: '#fff',
      },
    } as PaletteOptions,
  });
};
