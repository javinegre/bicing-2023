declare module '@mui/material/styles' {
  interface TypographyVariants {
    condensed: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    condensed?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    condensed: true;
  }
}

export default {};
