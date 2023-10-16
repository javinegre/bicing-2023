import { ThemeOptions } from '@mui/material/styles/createTheme';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#c11104',
    },
    secondary: {
      main: '#ffc400',
    },
    gradients: {
      main: 'linear-gradient(135deg, rgba(193,17,4,1) 0%, rgba(255,34,74,1) 100%)',
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
