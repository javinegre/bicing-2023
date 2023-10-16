// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PaletteOptions } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    gradients: {
      main: string;
    };
    statusBar: {
      mechanical: string;
      electrical: string;
      docks: string;
    };
  }

  export interface PaletteOptions {
    gradients: {
      main: string;
    };
    statusBar: {
      mechanical: string;
      electrical: string;
      docks: string;
    };
  }
}
