export const THEME_COLORS = {
  ALL: {
    black: '#09090b',
    darkGray: '#3f3f46',
    gray: '#52525b',
    lightGray: '#a1a1aa',
    white: '#fafafa',
    blue: '#0284c7',
    green: '#84cc16',
    red: '#e11d48',
    orange: '#ea580c',
    purple: '#34325C',
  },
  DARK_THEME: {
    backgroundColor: '#34325C',
    accentColor: '#EA580C',
    secondaryAccent: '#84cc16',
    text: '#FAFAFA',
  },
  LIGHT_THEME: {
    backgroundColor: '#FAFAFA',
    accentColor: '#EA580C',
    secondaryAccent: '#84cc16',
    text: '#34325C',
  },
} as const;

type ColorTheme = typeof THEME_COLORS;
