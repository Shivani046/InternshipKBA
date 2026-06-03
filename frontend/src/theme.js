import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#442f2a',        // Grey Brown
      contrastText: '#fff7ec',// Cream for text on buttons
    },
    secondary: {
      main: '#070d0d',        // Noir (deep black accent)
      contrastText: '#fff7ec',
    },
    background: {
      default: '#fff7ec',     // Cream main background
      paper: '#fff',          
    },
    text: {
      primary: '#442f2a',     // Grey Brown for normal text
      secondary: '#070d0d',   // Noir for subtitles,headings as accent
    },
  },
  typography: {
    fontFamily: '"Georgia", serif, "Arial", sans-serif',
    h4: { fontWeight: 700, letterSpacing: 1.5 },
    h5: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff', // Or try '#fff7ec' (Cream) for even softer look!
          borderRadius: 14,
          boxShadow: '0 2px 10px rgba(68,47,42,0.08)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#442f2a', // Grey Brown header
          color: '#fff7ec',           // Cream text
          fontWeight: 800,
          fontSize: '1rem',
        },
        body: {
          color: '#442f2a',           // Main table text, Grey Brown
          fontSize: '0.98rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#442f2a',
          color: '#fff7ec',
          '&:hover': { backgroundColor: '#2b1a17' },
        },
        containedSecondary: {
          backgroundColor: '#070d0d',
          color: '#fff7ec',
        },
        outlined: {
          borderColor: '#442f2a',
          color: '#442f2a',
          '&:hover': {
            backgroundColor: '#fff7ec',
            borderColor: '#2b1a17',
            color: '#2b1a17'
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff7ec',
          borderRadius: 6,
          input: {
            color: '#442f2a',
          },
          label: {
            color: '#442f2a',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fff7ec',
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#442f2a',
          color: '#fff7ec',
        },
      },
    },
  },
});

export default theme;