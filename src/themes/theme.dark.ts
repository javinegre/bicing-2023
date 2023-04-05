import { ThemeOptions } from '@mui/material/styles/createTheme';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#ffc400',
    },
    statusBar: {
      mechanical: '#FF0000',
      electrical: '#FFCC00',
      docks: '#808080',
    },
  },
  typography: {
    fontFamily: ['Barlow', 'sans-serif'].join(','),
    fontWeightMedium: 600,
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'condensed' },
          style: {
            fontFamily: ['Barlow Condensed', 'sans-serif'].join(','),
            display: 'block',
          },
        },
      ],
    },
  },
};

export default themeOptions;
