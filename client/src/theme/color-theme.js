import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			light: '#ECB390',
			main: '#DF7861',
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			light: '#CEE5D0',
			main: '#FCF8E8',
			// dark: will be calculated from palette.secondary.main,
			contrastText: '#FCF8E8',
		},
		// Used by `getContrastText()` to maximize the contrast between
		// the background and the text.
		contrastThreshold: 3,
	},
	typography: {
		fontFamily: 'Merriweather, sans-serif',
	},
});