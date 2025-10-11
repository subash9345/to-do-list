/**
 * Theme definitions for light and dark modes
 */

export const lightTheme = {
  name: 'light',
  colors: {
    // Primary colors
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryLight: '#818cf8',

    // Background colors
    background: '#f8fafc',
    backgroundSecondary: '#ffffff',
    backgroundTertiary: '#f1f5f9',

    // Surface colors (for cards, modals, etc.)
    surface: '#ffffff',
    surfaceHover: '#f8fafc',

    // Text colors
    text: '#1e293b',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',

    // Border colors
    border: '#e2e8f0',
    borderLight: '#f1f5f9',

    // Status colors
    success: '#10b981',
    successLight: '#d1fae5',
    warning: '#f59e0b',
    warningLight: '#fef3c7',
    error: '#ef4444',
    errorLight: '#fee2e2',
    info: '#3b82f6',
    infoLight: '#dbeafe',

    // Priority colors
    priorityHigh: '#ef4444',
    priorityMedium: '#f59e0b',
    priorityLow: '#10b981',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowMedium: 'rgba(0, 0, 0, 0.15)',
    shadowLarge: 'rgba(0, 0, 0, 0.2)',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.5)',
  },

  fonts: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },

  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },

  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export const darkTheme = {
  ...lightTheme,
  name: 'dark',
  colors: {
    // Primary colors
    primary: '#818cf8',
    primaryHover: '#6366f1',
    primaryLight: '#a5b4fc',

    // Background colors
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',

    // Surface colors
    surface: '#1e293b',
    surfaceHover: '#334155',

    // Text colors
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',

    // Border colors
    border: '#334155',
    borderLight: '#475569',

    // Status colors
    success: '#34d399',
    successLight: '#064e3b',
    warning: '#fbbf24',
    warningLight: '#78350f',
    error: '#f87171',
    errorLight: '#7f1d1d',
    info: '#60a5fa',
    infoLight: '#1e3a8a',

    // Priority colors
    priorityHigh: '#f87171',
    priorityMedium: '#fbbf24',
    priorityLow: '#34d399',

    // Shadow
    shadow: 'rgba(0, 0, 0, 0.3)',
    shadowMedium: 'rgba(0, 0, 0, 0.4)',
    shadowLarge: 'rgba(0, 0, 0, 0.5)',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
};

export const getTheme = (themeName) => {
  return themeName === 'dark' ? darkTheme : lightTheme;
};
