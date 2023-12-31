import { createTheme } from '@mui/material/styles'
import { green, grey, red } from '@mui/material/colors'

// Theme: https://mui.com/store/items/onepirate/
const rawTheme = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: '#28282a',
      dark: '#1e1e1f'
    },
    secondary: {
      light: '#fff5f8',
      main: '#ff3366',
      dark: '#e62958'
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e'
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700]
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700]
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 16,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700 // Roboto Condensed
  }
})

const fontHeaderSoft = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightLight,
  fontFamily: "'Roboto Condensed', sans-serif"
}

const fontHeader = {
  ...fontHeaderSoft,
  fontWeight: rawTheme.typography.fontWeightMedium,
  textTransform: 'uppercase'
}

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200]
    }
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 58
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
      fontSize: 44
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
      fontSize: 38
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeaderSoft,
      fontSize: 34
    },
    h5: {
      ...rawTheme.typography.h5,
      fontSize: 30,
      fontWeight: rawTheme.typography.fontWeightLight
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: 26
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
      fontSize: 24
    },
    body1: {
      ...rawTheme.typography.body2,
      fontWeight: rawTheme.typography.fontWeightRegular,
      fontSize: 22
    },
    body2: {
      ...rawTheme.typography.body1,
      fontSize: 18
    }
  }
}

export default theme
